const firebaseConfig = {
    apiKey: "AIzaSyANvLOPs3LOkLhI3x8JZkAbezMORAQSmoY",
    authDomain: "svayo-rodnae.firebaseapp.com",
    projectId: "svayo-rodnae",
    storageBucket: "svayo-rodnae.firebasestorage.app",
    messagingSenderId: "384138397345",
    appId: "1:384138397345:web:c056509123750924c152e0"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


db.enablePersistence()
    .catch(function(err) {
        console.warn('Офлайн-режим не доступен:', err);
    });

console.log('✅ Firebase инициализирован');