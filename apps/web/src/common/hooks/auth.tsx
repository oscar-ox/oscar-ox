import { createContext, useContext, useState, ReactNode } from "react";

// context type
type authContextType = {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

// context default vlaues
const authContextDefaultValues = {
  loggedIn: false,
  setLoggedIn: () => {},
};

export const AuthContext = createContext<authContextType>(
  authContextDefaultValues
);
export const useAuth = () => useContext(AuthContext);

// provider props
type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
