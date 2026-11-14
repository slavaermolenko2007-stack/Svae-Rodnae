async function createOrder(orderData) {
    try {
        const user = getCurrentUser();
        if (!user) {
            showToast('❌ Войдите, чтобы оформить заказ', 'error');
            return { success: false, error: 'Необходимо авторизоваться' };
        }

       
        const userData = await getUserData(user.uid);

        const order = {
            ...orderData,
            userId: user.uid,
            userName: userData.data.name || 'Пользователь',
            userEmail: user.email,
            userPhone: userData.data.phone || '',
            status: 'pending', // pending, processing, shipped, delivered, cancelled
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('orders').add(order);
        
       
        localStorage.removeItem('svayo_cart');
        updateCartCounter();

        showToast('✅ Заказ оформлен!');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Ошибка создания заказа:', error);
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}


async function getUserOrders() {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }

        const snapshot = await db.collection('orders')
            .where('userId', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .get();

        const orders = [];
        snapshot.forEach(doc => {
            const data = doc.data();
           
            if (data.createdAt) {
                data.createdAt = data.createdAt.toDate ? data.createdAt.toDate() : new Date();
            }
            orders.push({ id: doc.id, ...data });
        });
        return { success: true, data: orders };
    } catch (error) {
        console.error('Ошибка получения заказов:', error);
        return { success: false, error: error.message };
    }
}

async function getAllOrders() {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }

        const userData = await getUserData(user.uid);
        if (userData.data.role !== 'farmer' && userData.data.role !== 'admin') {
            return { success: false, error: 'Нет прав для просмотра всех заказов' };
        }

        const snapshot = await db.collection('orders')
            .orderBy('createdAt', 'desc')
            .get();

        const orders = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.createdAt) {
                data.createdAt = data.createdAt.toDate ? data.createdAt.toDate() : new Date();
            }
            orders.push({ id: doc.id, ...data });
        });
        return { success: true, data: orders };
    } catch (error) {
        console.error('Ошибка получения заказов:', error);
        return { success: false, error: error.message };
    }
}


async function updateOrderStatus(orderId, status) {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }

        const userData = await getUserData(user.uid);
        if (userData.data.role !== 'farmer' && userData.data.role !== 'admin') {
            return { success: false, error: 'Нет прав для изменения статуса' };
        }

        await db.collection('orders').doc(orderId).update({
            status: status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        showToast('✅ Статус заказа обновлён');
        return { success: true };
    } catch (error) {
        console.error('Ошибка обновления статуса:', error);
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}


async function getUserOrdersCount() {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }

        const snapshot = await db.collection('orders')
            .where('userId', '==', user.uid)
            .get();

        return { success: true, count: snapshot.size };
    } catch (error) {
        console.error('Ошибка получения количества заказов:', error);
        return { success: false, error: error.message };
    }
}