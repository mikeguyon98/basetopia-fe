import React from "react";
import { useTranslation } from "react-i18next";
import { signInWithGoogle } from "../auth";

function SignInButton() {
  const { t } = useTranslation();
  
  const handleClick = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch(console.error);
  };

  return <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{t('signIn')}</button>;
}

export default SignInButton;
