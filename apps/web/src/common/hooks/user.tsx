import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// user type
type user = {
  loggedIn: Boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
};

// context type
type userContextType = {
  user: user;
  setUser: (value: user) => void;
};

// default vlaues for the context
const userContextDefaultValues = {
  user: { loggedIn: false },
  setUser: () => {},
};

export const UserContext = createContext<userContextType>(
  userContextDefaultValues
);

export const useUser = () => useContext(UserContext);

// provider props
type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<user>(userContextDefaultValues.user);

  useEffect(() => {
    if (localStorage["user"]) {
      const value = JSON.parse(localStorage.getItem("user") || "");
      setUser(value);
    }
  }, []);

  useEffect(() => {
    if (user != userContextDefaultValues.user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
