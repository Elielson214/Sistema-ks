import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contatos from './pages/Contatos';
import Campanha from './pages/Campanha';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import Usuarios from './pages/Usuarios';
import Discadora from './pages/Discadora';
import UraReversa from './pages/UraReversa';
import GestorWhatsapp from './pages/GestorWhatsapp';

function App() {
return (
<BrowserRouter>
<AuthProvider>
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
<Route path="/contatos" element={<PrivateRoute><Contatos /></PrivateRoute>} />
<Route path="/campanha" element={<PrivateRoute><Campanha /></PrivateRoute>} />
<Route path="/relatorios" element={<PrivateRoute><Relatorios /></PrivateRoute>} />
<Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
<Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
<Route path="/discadora" element={<PrivateRoute><Discadora /></PrivateRoute>} />
<Route path="/ura-reversa" element={<PrivateRoute><UraReversa /></PrivateRoute>} />
<Route path="/gestor-whatsapp" element={<PrivateRoute><GestorWhatsapp /></PrivateRoute>} />
<Route path="/" element={<Navigate to="/dashboard" replace />} />
<Route path="*" element={<Navigate to="/dashboard" replace />} />
</Routes>
</AuthProvider>
</BrowserRouter>
);
}

export default App;