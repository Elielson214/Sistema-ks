import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";

const API_URL = "https://sistema-ks-api.onrender.com";

interface User {
id: number;
nome: string;
email: string;
tipo: string;
}

interface AuthContextType {
user: User | null;
token: string | null;
isAuthenticated: boolean;
login: (email: string, senha: string) => Promise<void>;
logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
const [user, setUser] = useState<User | null>(null);
const [token, setToken] = useState<string | null>(null);

const isAuthenticated = useMemo(() => !!token, [token]);

async function login(email: string, senha: string) {
const res = await fetch(`${API_URL}/login`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, senha }),
});

if (!res.ok) {
const data = await res.json();
throw new Error(data.error || "Credenciais inválidas");
}

const data = await res.json();
setToken(data.token);
setUser(data.usuario);
localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.usuario));
}

function logout() {
setToken(null);
setUser(null);
localStorage.removeItem("token");
localStorage.removeItem("user");
}

return (
<AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
const context = useContext(AuthContext);
if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
return context;
}