// UserContext.js
import { createContext, useContext } from "react";
import { UserType } from "../types/users";

type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser doit être utilisé dans un UserProvider");
  }
  return context;
};
