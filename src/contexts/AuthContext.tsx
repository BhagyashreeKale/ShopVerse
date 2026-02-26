import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("martify_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const accounts = JSON.parse(localStorage.getItem("martify_accounts") || "[]");
    const account = accounts.find((a: any) => a.email === email);
    if (!account) throw new Error("No account found with this email");
    if (account.password !== password) throw new Error("Incorrect password");
    const u: User = { id: account.id, name: account.name, email: account.email, joinedAt: account.joinedAt };
    setUser(u);
    localStorage.setItem("martify_user", JSON.stringify(u));
  };

  const signup = async (name: string, email: string, password: string) => {
    const accounts = JSON.parse(localStorage.getItem("martify_accounts") || "[]");
    if (accounts.find((a: any) => a.email === email)) throw new Error("An account with this email already exists");
    const newAccount = { id: crypto.randomUUID(), name, email, password, joinedAt: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }) };
    accounts.push(newAccount);
    localStorage.setItem("martify_accounts", JSON.stringify(accounts));
    const u: User = { id: newAccount.id, name: newAccount.name, email: newAccount.email, joinedAt: newAccount.joinedAt };
    setUser(u);
    localStorage.setItem("martify_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("martify_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
