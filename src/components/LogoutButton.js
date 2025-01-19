import React from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "../auth";
import { useTranslation } from "react-i18next";

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

  return (
    <button 
      onClick={handleLogout} 
      className="hover:text-gray-300 relative group"
      aria-label="Sign out"
    >
      <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
      <span className="absolute top-full -left-8 mt-1 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {t('signOut')}
      </span>
    </button>
  );
}

export default LogoutButton;