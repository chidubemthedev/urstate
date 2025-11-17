// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApabzbpkahkuPWch3cZE4ilYfAfCUjGzM",
  authDomain: "urstate-45098.firebaseapp.com",
  projectId: "urstate-45098",
  storageBucket: "urstate-45098.firebasestorage.app",
  messagingSenderId: "133881315238",
  appId: "1:133881315238:web:58855c3727dc41d96ad967",
  measurementId: "G-YKYR463HN4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export async function addWaitlistEntry(
  name: string,
  email: string,
  phone: string,
  role: string
) {
  try {
    // Reference the 'waitlist' collection
    const waitlistCollection = collection(db, "waitlist");

    // Add a new document with a generated ID
    const docRef = await addDoc(waitlistCollection, {
      name: name,
      email: email,
      phoneNumber: phone, // Using phoneNumber for clarity in database field
      role: role,
      timestamp: new Date(), // Useful for knowing when they signed up
    });

    console.log("Document written with ID: ", docRef.id);
    // Return the new document id so callers can react to success
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    // Re-throw so callers can handle errors (and show UI feedback)
    throw e;
  }
}

export { analytics };
