import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    try {
      await login(email, senha);
      navigate("/dashboard");
    } catch (err: any) {
      setErro(err.message || "Erro ao fazer login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoArea}>
          <img src="/logo.webp" alt="Logo" style={styles.logo} />
          <h1 style={styles.title}>Agência KS</h1>
        </div>
        {erro && <div style={styles.error}>{erro}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="senha" style={styles.label}>Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Entrar</button>
        </form>
        <p style={styles.register}>
          Não tem conta? <a href="/cadastro" style={styles.link}>Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A3B4C",
    padding: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: "48px 40px",
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  logoArea: {
    marginBottom: 12,
  },
  logo: {
    height: 200,
  },
  title: {
    fontSize: 28,
    color: "#800020",
    textTransform: "uppercase",
    letterSpacing: 2,
    margin: "0 0 32px 0",
  },
  error: {
    background: "#f8d7da",
    color: "#721c24",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  field: {
    textAlign: "left",
    marginBottom: 20,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #ddd",
    borderRadius: 8,
    fontSize: 16,
    background: "#f9f9f9",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: 14,
    background: "#800020",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
  },
  register: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#800020",
    fontWeight: 700,
    textDecoration: "none",
  },
};