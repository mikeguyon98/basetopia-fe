import React from "react";
import { signOut } from "../auth";

function LogoutButton() {
  const handleLogout = () => {
    signOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return <button onClick={handleLogout}>Sign Out</button>;
}

export default LogoutButton;