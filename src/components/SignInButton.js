import React from "react";
import { signInWithGoogle } from "../auth";

function SignInButton() {
  const handleClick = () => {
    signInWithGoogle()
      .then((result) => {
        // Signed in successfully
        const user = result.user;
        console.log("User signed in:", user);
      })
      .catch(console.error);
  };

  return <button onClick={handleClick}>Sign in with Google</button>;
}

export default SignInButton;
