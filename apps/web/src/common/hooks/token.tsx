import { createContext, useContext, useState, ReactNode } from "react";

// token context type
type tokenContextType = {
  token?: string;
  setToken: (value: string) => void;
};

// default vlaues for the context
const tokenContextDefaultValues = {
  token: "",
  setToken: () => {},
};

export const TokenContext = createContext<tokenContextType>(
  tokenContextDefaultValues
);
export const useToken = () => useContext(TokenContext);

// provider props
type Props = {
  children: ReactNode;
};

export function TokenProvider({ children }: Props) {
  const [token, setToken] = useState<string>("none");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
