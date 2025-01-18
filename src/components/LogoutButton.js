import React from "react";
import { useTranslation } from "react-i18next";
import { signOut } from "../auth";

function LogoutButton() {
  const { t } = useTranslation();
  
  const handleLogout = () => {
    signOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return <button onClick={handleLogout} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">{t('signOut')}</button>;
}

export default LogoutButton;