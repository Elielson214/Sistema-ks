import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
const token = localStorage.getItem('token');
if (!token) return null;
try {
const payload = JSON.parse(atob(token.split('.')[1]));
return { id: payload.userId, email: payload.email };
} catch {
return null;
}
});
const navigate = useNavigate();

const login = async (email, password) => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
});
const data = await response.json();
if (!response.ok) throw new Error(data.error || 'Erro no login');
localStorage.setItem('token', data.token);
setUser(data.user);
return data;
};

const register = async (name, email, password) => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, email, password })
});
const data = await response.json();
if (!response.ok) throw new Error(data.error || 'Erro ao registrar');
localStorage.setItem('token', data.token);
setUser(data.user);
return data;
};

const forgotPassword = async (email) => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/forgot-password`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email })
});
const data = await response.json();
if (!response.ok) throw new Error(data.error || 'Erro ao solicitar recuperação');
return data;
};

const resetPassword = async (token, newPassword) => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reset-password`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ token, newPassword })
});
const data = await response.json();
if (!response.ok) throw new Error(data.error || 'Erro ao redefinir senha');
return data;
};

const logout = () => {
localStorage.removeItem('token');
setUser(null);
navigate('/login');
};

return (
<AuthContext.Provider value={{ user, login, register, forgotPassword, resetPassword, logout }}>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
const context = useContext(AuthContext);
if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
return context;
}
