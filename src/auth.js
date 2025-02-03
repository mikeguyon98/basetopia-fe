// src/auth.js or a React component
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";
import { fetchWithAuth } from "./api/client";

const auth = getAuth(app);     // Pass your initialized "app" here
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    
    // Wait for a short moment to ensure Firebase auth state is updated
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // After successful sign in, create user document using fetchWithAuth
    try {
      await fetchWithAuth('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          email: result.user.email,
          display_name: result.user.displayName,
          nationality: "",
          teams_following: [],
          players_following: []
        })
      });
    } catch (error) {
      // If error is 409 Conflict, user already exists, which is fine
      if (!error.message.includes('409')) {
        console.error('Error creating user document:', error);
      }
    }

    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export function signOut() {
  return auth.signOut();
}