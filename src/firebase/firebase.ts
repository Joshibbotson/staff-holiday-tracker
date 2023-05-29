import { initializeApp, FirebaseApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const storage: FirebaseStorage = getStorage(app);
export const appCheckPublicKey = "6Ler-ksmAAAAAOooJWs7SVE0YLBHkcJ4EUID4aJ4";
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(appCheckPublicKey),
    isTokenAutoRefreshEnabled: true,
});
