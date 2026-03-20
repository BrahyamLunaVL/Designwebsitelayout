import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if admin user (admin@example.com is admin)
    const isAdminUser = email === "admin@example.com";
    
    setUser({
      id: "1",
      name: isAdminUser ? "Admin User" : "John Collector",
      email: email,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      isAdmin: isAdminUser
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: "1",
      name: name,
      email: email,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}