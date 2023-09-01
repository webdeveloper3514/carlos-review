import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: "sakit-review-system.firebaseapp.com",
    projectId: "sakit-review-system",
    storageBucket: "sakit-review-system.appspot.com",
    messagingSenderId: process.env.REACT_APP_FB_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);

export default app;