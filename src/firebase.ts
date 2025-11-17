// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyApabzbpkahkuPWch3cZE4ilYfAfCUjGzM",
  authDomain: "urstate-45098.firebaseapp.com",
  projectId: "urstate-45098",
  storageBucket: "urstate-45098.firebasestorage.app",
  messagingSenderId: "133881315238",
  appId: "1:133881315238:web:58855c3727dc41d96ad967",
  measurementId: "G-YKYR463HN4",
};

// Initialize Firebase (safe on server)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---- FIX: Initialize analytics only in the browser ----
let analytics: ReturnType<typeof getAnalytics> | null = null;

export async function initAnalytics() {
  if (typeof window === "undefined") return null; // SSR guard

  const supported = await isSupported();
  if (!supported) return null;

  if (!analytics) {
    analytics = getAnalytics(app);
  }

  return analytics;
}
// -------------------------------------------------------

export async function addWaitlistEntry(
  name: string,
  email: string,
  phone: string,
  role: string
) {
  try {
    const waitlistCollection = collection(db, "waitlist");

    const docRef = await addDoc(waitlistCollection, {
      name,
      email,
      phoneNumber: phone,
      role,
      timestamp: new Date(),
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export { db, analytics }; // analytics will be null on the server
