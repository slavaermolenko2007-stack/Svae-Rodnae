async function registerUser(email, password, userData) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

       
        await db.collection('users').doc(user.uid).set({
            name: userData.name || '',
            email: email,
            phone: userData.phone || '',
            role: userData.role || 'user',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        showToast('✅ Регистрация успешна!');
        return { success: true, user: user };
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}


async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        showToast('✅ Добро пожаловать!');
        return { success: true, user: user };
    } catch (error) {
        console.error('Ошибка входа:', error);
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}

async function logoutUser() {
    try {
        localStorage.removeItem('svayo_cart');
        localStorage.removeItem('svayo_products');
        localStorage.removeItem('svayo_user');
        
        await auth.signOut();
        showToast('✅ Вы вышли из системы');
        window.location.href = 'index.html';
        return { success: true };
    } catch (error) {
        console.error('Ошибка выхода:', error);
        showToast('❌ ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}


function getCurrentUser() {
    return auth.currentUser;
}


async function getUserData(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists) {
            return { success: true, data: doc.data() };
        }
        return { success: false, error: 'Пользователь не найден' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

auth.onAuthStateChanged(async function(user) {
    if (user) {
        const result = await getUserData(user.uid);
        if (result.success) {
            window.currentUser = { uid: user.uid, ...result.data };
            localStorage.setItem('svayo_user', JSON.stringify(window.currentUser));
        } else {
            
            try {
                await db.collection('users').doc(user.uid).set({
                    name: user.displayName || 'Пользователь',
                    email: user.email,
                    role: 'user',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                window.currentUser = { uid: user.uid, name: user.displayName || 'Пользователь', email: user.email, role: 'user' };
                localStorage.setItem('svayo_user', JSON.stringify(window.currentUser));
            } catch (e) {
                console.error('Ошибка создания пользователя:', e);
            }
        }
        updateUIBasedOnAuth(true);
    } else {
        window.currentUser = null;
        localStorage.removeItem('svayo_user');
        updateUIBasedOnAuth(false);
    }
});


function updateUIBasedOnAuth(isLoggedIn) {
    const authLinks = document.querySelectorAll('.auth-link');
    const userMenu = document.querySelector('.user-menu');
    const userNameEl = document.querySelector('.user-name');

    if (isLoggedIn && window.currentUser) {
        authLinks.forEach(el => el.style.display = 'none');
        if (userMenu) userMenu.style.display = 'inline-block';
        if (userNameEl) userNameEl.textContent = window.currentUser.name || 'Пользователь';
    } else {
        authLinks.forEach(el => el.style.display = 'inline-block');
        if (userMenu) userMenu.style.display = 'none';
    }
}


const savedUser = localStorage.getItem('svayo_user');
if (savedUser) {
    try {
        window.currentUser = JSON.parse(savedUser);
    } catch (e) {}
}