import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsuario(payload.email || "Usuário");
      } catch {
        navigate("/login");
      }
    }
  }, []);

  const modulos = [
    { nome: "Dashboard", icone: "/dashboard.webp", rota: "/dashboard", cor: "#750116" },
    { nome: "Contatos", icone: "/contato.webp", rota: "/contatos", cor: "#750116" },
    { nome: "Campanha", icone: "/campanha.webp", rota: "/campanha", cor: "#750116" },
    { nome: "Relatórios", icone: "/relatório.webp", rota: "/relatorios", cor: "#750116" },
    { nome: "Configurações", icone: "/configurações.webp", rota: "/configuracoes", cor: "#750116" },
    { nome: "Usuários", icone: "/usuário.webp", rota: "/usuarios", cor: "#750116" },
    { nome: "Discadora", icone: "/discadora.webp", rota: "/discadora", cor: "#750116" },
    { nome: "URA Reversa", icone: "/ura.webp", rota: "/ura-reversa", cor: "#750116" },
    { nome: "Gestor Whatsapp", icone: "/gestor.webp", rota: "/gestorwhatsapp", cor: "#750116" },
  ];

  function corDoTexto(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 140 ? "#000" : "#FFF";
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.webp" alt="Logo" style={{ height: "50px" }} />
          <h1 style={{ color: "#750116", fontSize: "24px", margin: 0 }}>Agência KS</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#750116", fontSize: "14px" }}>{usuario}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#750116",
              color: "#FFF",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Sair
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {modulos.map((mod) => (
          <div
            key={mod.nome}
            onClick={() => navigate(mod.rota)}
            style={{
              backgroundColor: mod.cor,
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              transition: "transform 0.2s",
              color: corDoTexto(mod.cor),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <img src={mod.icone} alt={mod.nome} style={{ height: 100, width: 100, marginBottom: "12px" }} />
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>{mod.nome}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}