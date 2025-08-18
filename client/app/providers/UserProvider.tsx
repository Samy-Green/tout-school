import { useState } from "react";
import { UserContext } from "../context/userContext";
import { UserType } from "../types/users";

export function UserProvider({ children }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
