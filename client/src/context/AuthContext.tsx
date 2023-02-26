import React, { createContext, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

type UserContextType = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as UserContextType);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
