import { useState } from "react";
import api from "../api";
import AuthContext from "./auth-context";

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser());

  function saveUser(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  async function logout() {
    await api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
