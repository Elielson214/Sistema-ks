import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
const { register } = useAuth();
const navigate = useNavigate();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [erro, setErro] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
setErro('');
if (password !== confirmPassword) {
setErro('Senhas não conferem');
return;
}
try {
await register(name, email, password);
navigate('/dashboard');
} catch (err) {
setErro(err.message);
}
};

return (
<div style={{ maxWidth: 400, margin: 'auto' }}>
<h2>Cadastrar</h2>
{erro && <p style={{ color: 'red' }}>{erro}</p>}
<form onSubmit={handleSubmit}>
<input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
<input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
<input type="password" placeholder="Confirmar senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
<button type="submit">Cadastrar</button>
</form>
<p>Já tem conta? <a href="/login">Faça login</a></p>
</div>
);
}
