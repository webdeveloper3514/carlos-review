import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: "sakit-review-system.firebaseapp.com",
    projectId: "sakit-review-system",
    storageBucket: "sakit-review-system.appspot.com",
    messagingSenderId: "169502538768",
    appId: "1:169502538768:web:c71e1f36f039621c0fde95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);

export default app;