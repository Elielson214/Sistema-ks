import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
const { forgotPassword } = useAuth();
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [erro, setErro] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
setErro('');
setMessage('');
try {
const res = await forgotPassword(email);
setMessage(res.message || 'Verifique seu email');
} catch (err) {
setErro(err.message);
}
};

return (
<div style={{ maxWidth: 400, margin: 'auto' }}>
<h2>Recuperar senha</h2>
{message && <p style={{ color: 'green' }}>{message}</p>}
{erro && <p style={{ color: 'red' }}>{erro}</p>}
<form onSubmit={handleSubmit}>
<input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
<button type="submit">Enviar link de recuperação</button>
</form>
<p><a href="/login">Voltar ao login</a></p>
</div>
);
}
