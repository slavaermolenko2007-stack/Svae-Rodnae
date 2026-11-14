
async function getCurrentUserData() {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }
        return await getUserData(user.uid);
    } catch (error) {
        return { success: false, error: error.message };
    }
}


async function updateUserProfile(profileData) {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }
        
        await db.collection('users').doc(user.uid).update({
            ...profileData,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('✅ Профиль обновлён');
        return { success: true };
    } catch (error) {
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}


async function getAllFarmers() {
    try {
        const snapshot = await db.collection('users')
            .where('role', '==', 'farmer')
            .get();
        
        const farmers = [];
        snapshot.forEach(doc => {
            farmers.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: farmers };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getUserStats() {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }
        
       
        const ordersResult = await getUserOrdersCount();
        const ordersCount = ordersResult.success ? ordersResult.count : 0;
        
      
        const userData = await getUserData(user.uid);
        const favoritesCount = userData.data.favorites ? userData.data.favorites.length : 0;
        
  
        let productsCount = 0;
        if (userData.data.role === 'farmer' || userData.data.role === 'admin') {
            const productsResult = await getFarmerProducts(user.uid);
            if (productsResult.success) {
                productsCount = productsResult.data.length;
            }
        }
        
        return {
            success: true,
            data: {
                ordersCount: ordersCount,
                favoritesCount: favoritesCount,
                productsCount: productsCount,
                name: userData.data.name || '',
                phone: userData.data.phone || '',
                address: userData.data.address || '',
                role: userData.data.role || 'user'
            }
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


async function toggleFavorite(productId) {
    try {
        const user = getCurrentUser();
        if (!user) {
            showToast('❌ Войдите, чтобы добавить в избранное', 'error');
            return { success: false, error: 'Необходимо авторизоваться' };
        }
        
        const userDoc = await db.collection('users').doc(user.uid);
        const userData = await userDoc.get();
        let favorites = userData.data().favorites || [];
        
        const index = favorites.indexOf(productId);
        if (index > -1) {
            favorites.splice(index, 1);
            showToast('❌ Удалено из избранного');
        } else {
            favorites.push(productId);
            showToast('❤️ Добавлено в избранное');
        }
        
        await userDoc.update({ favorites: favorites });
        return { success: true, favorites: favorites };
    } catch (error) {
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}