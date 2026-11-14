async function getAllProducts() {
    try {
        const snapshot = await db.collection('products')
            .where('available', '==', true)
            .orderBy('createdAt', 'desc')
            .get();

        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: products };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getProductsByCategory(category) {
    try {
        const snapshot = await db.collection('products')
            .where('category', '==', category)
            .where('available', '==', true)
            .get();

        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: products };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getFarmerProducts(farmerId) {
    try {
        const snapshot = await db.collection('products')
            .where('farmerId', '==', farmerId)
            .get();

        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: products };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function addProduct(productData, imageFile) {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }

        const userData = await getUserData(user.uid);
        if (userData.data.role !== 'farmer' && userData.data.role !== 'admin') {
            return { success: false, error: 'Только фермеры могут добавлять товары' };
        }

        let imageUrl = '';
        if (imageFile) {
            const storageRef = storage.ref('products/' + Date.now() + '_' + imageFile.name);
            const snapshot = await storageRef.put(imageFile);
            imageUrl = await snapshot.ref.getDownloadURL();
        }

        const product = {
            ...productData,
            farmerId: user.uid,
            farmerName: userData.data.name || 'Фермер',
            imageUrl: imageUrl,
            available: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('products').add(product);
        showToast('✅ Товар добавлен!');
        return { success: true, id: docRef.id };
    } catch (error) {
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}

async function deleteProduct(productId) {
    try {
        await db.collection('products').doc(productId).update({
            available: false,
            deletedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        showToast('✅ Товар удалён');
        return { success: true };
    } catch (error) {
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}