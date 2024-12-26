import { useQuery } from "@apollo/client";
import { createContext, ReactNode, useState } from "react";
import client from "../apollo/apolloClient";
import { GET_CURRENT_LOGGED_IN_USER } from "../graphql/user/queries";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNo: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const token = localStorage.getItem("token");

  const { refetch } = useQuery(GET_CURRENT_LOGGED_IN_USER, {
    skip: !token,
    onCompleted: (data) => {
      setUser(data?.getCurrentLoggedInUser || null);
      setLoading(false);
    },
    onError: () => {
      setUser(null);
      setLoading(false);
    },
    fetchPolicy: "network-only",
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    client.clearStore().then(() => {
      refetch();
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    client.clearStore().then(() => {
      client.resetStore();
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
