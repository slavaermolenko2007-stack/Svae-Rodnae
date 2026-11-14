async function addReview(productId, rating, text) {
    try {
        const user = getCurrentUser();
        if (!user) {
            showToast('❌ Войдите, чтобы оставить отзыв', 'error');
            return { success: false, error: 'Необходимо авторизоваться' };
        }

        const userData = await getUserData(user.uid);
        if (!userData.success) {
            return { success: false, error: 'Ошибка получения данных пользователя' };
        }

        const review = {
            productId: productId,
            userId: user.uid,
            userName: userData.data.name || 'Пользователь',
            rating: parseInt(rating),
            text: text.trim(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('reviews').add(review);


        await updateProductRating(productId);

        showToast('✅ Спасибо за отзыв!');
        return { success: true, id: docRef.id };
    } catch (error) {
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}

async function getProductReviews(productId) {
    try {
        const snapshot = await db.collection('reviews')
            .where('productId', '==', productId)
            .orderBy('createdAt', 'desc')
            .get();

        const reviews = [];
        snapshot.forEach(doc => {
            const data = doc.data();
          
            if (data.createdAt) {
                data.createdAt = data.createdAt.toDate ? data.createdAt.toDate().toLocaleDateString('ru-RU') : 'Недавно';
            }
            reviews.push({ id: doc.id, ...data });
        });
        return { success: true, data: reviews };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function updateProductRating(productId) {
    try {
     
        const result = await getProductReviews(productId);
        if (!result.success) return;

        const reviews = result.data;
        if (reviews.length === 0) return;

 
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = Math.round((totalRating / reviews.length) * 10) / 10;

        await db.collection('products').doc(productId).update({
            rating: avgRating,
            reviewsCount: reviews.length
        });

        return { success: true, rating: avgRating, count: reviews.length };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function deleteReview(reviewId) {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'Необходимо авторизоваться' };
        }

        const reviewDoc = await db.collection('reviews').doc(reviewId).get();
        if (!reviewDoc.exists) {
            return { success: false, error: 'Отзыв не найден' };
        }

        const reviewData = reviewDoc.data();
        const userData = await getUserData(user.uid);
        
        if (reviewData.userId !== user.uid && userData.data.role !== 'admin') {
            return { success: false, error: 'Нет прав для удаления этого отзыва' };
        }

        await db.collection('reviews').doc(reviewId).delete();
      
        await updateProductRating(reviewData.productId);
        
        showToast('✅ Отзыв удалён');
        return { success: true };
    } catch (error) {
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}