import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDzjE-B5qQAjAHB58SWAy9ihSuUVhu6zWQ",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "portfolio-3427f.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "portfolio-3427f",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "portfolio-3427f.firebasestorage.app",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "984001964574",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:984001964574:web:4679026bc9405b80021c0f",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-RL8WB17SCJ"
};

// Initialize Firebase
let app, db, analytics;

try {
    app = initializeApp(firebaseConfig);

    // Initialize Firestore
    db = getFirestore(app);

    // Initialize Analytics (optional)
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
} catch (error) {
    console.warn('Failed to initialize Firebase:', error);
    // Provide fallback objects to prevent crashes
    app = null;
    db = null;
    analytics = null;
}

// Function to save contact form submissions
export const saveContactSubmission = async (formData) => {
    if (!db) {
        console.warn('Firebase not initialized, skipping contact submission');
        return null;
    }

    try {
        const docRef = await addDoc(collection(db, "contact_submissions"), {
            ...formData,
            timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

export { app, db, analytics };