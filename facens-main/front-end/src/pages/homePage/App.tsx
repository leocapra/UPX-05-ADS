import { useState, useEffect, type JSX } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  useMediaQuery,
  Divider,
  Button,
  Card,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RoomIcon from "@mui/icons-material/Room";
import MapIcon from "@mui/icons-material/Map";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Simulação de dados de pontos de coleta ---
type PontoColeta = {
  id: number;
  nome: string;
  endereco: string;
  materiaisAceitos: string[];
  horario: string;
  latitude: number;
  longitude: number;
};

// Mock de pontos (poderia ser JSON externo)
const pontosMock: PontoColeta[] = [
  {
    id: 1,
    nome: "EcoPonto Central",
    endereco: "Rua das Flores, 120 - Centro",
    materiaisAceitos: ["Plástico", "Papel", "Vidro"],
    horario: "08h às 18h",
    latitude: -23.561684,
    longitude: -46.625378,
  },
  {
    id: 2,
    nome: "Recicla Sul",
    endereco: "Av. das Palmeiras, 890 - Jardim Sul",
    materiaisAceitos: ["Metal", "Eletrônicos"],
    horario: "09h às 17h",
    latitude: -23.56321,
    longitude: -46.643212,
  },
  {
    id: 3,
    nome: "Coleta Verde Norte",
    endereco: "Rua Limeira, 55 - Zona Norte",
    materiaisAceitos: ["Plástico", "Papelão", "Pilhas"],
    horario: "07h às 16h",
    latitude: -23.523999,
    longitude: -46.652232,
  },
];

// --- Componente Principal ---
export default function HomePage(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loadingMap, setLoadingMap] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<PontoColeta | null>(null);

  // Simulação de carregamento
  useEffect(() => {
    const timeout = setTimeout(() => setLoadingMap(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleCheckIn = (ponto: PontoColeta) => {
    toast.success(`Check-in realizado em ${ponto.nome}! 🌱`);
    setSelectedPoint(ponto);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />

      <Box sx={{ p: isMobile ? 2 : 4, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Cabeçalho */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: 'green' }}>
            Sistema de Reciclagem Sustentável ♻️
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Visualize os pontos de coleta e incentive práticas ambientais responsáveis
          </Typography>
        </Box>

        {/* Resumo de funcionalidades */}
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Funcionalidades Ativas (simulação)
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            <Card sx={{ p: 2, textAlign: "center", bgcolor: "#f4f9f4" }}>
              <MapIcon sx={{ fontSize: 40, color: "green" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Localização de Pontos
              </Typography>
              <Typography variant="body2">
                Encontre locais de coleta próximos de forma rápida e prática.
              </Typography>
            </Card>

            <Card sx={{ p: 2, textAlign: "center", bgcolor: "#f4f9f4" }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: "green" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Check-in de Descarte
              </Typography>
              <Typography variant="body2">
                Registre entregas de resíduos para rastreamento e recompensas.
              </Typography>
            </Card>

            <Card sx={{ p: 2, textAlign: "center", bgcolor: "#f4f9f4" }}>
              <NotificationsActiveIcon sx={{ fontSize: 40, color: "green" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Notificações Ambientais
              </Typography>
              <Typography variant="body2">
                Receba alertas sobre reciclagem e eventos ecológicos.
              </Typography>
            </Card>

            <Card sx={{ p: 2, textAlign: "center", bgcolor: "#f4f9f4" }}>
              <SupportAgentIcon sx={{ fontSize: 40, color: "green" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Suporte ao Cliente
              </Typography>
              <Typography variant="body2">
                Canais simulados de chat e e-mail para dúvidas e sugestões.
              </Typography>
            </Card>

            <Card sx={{ p: 2, textAlign: "center", bgcolor: "#f4f9f4" }}>
              <RoomIcon sx={{ fontSize: 40, color: "green" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Visibilidade para Empresas
              </Typography>
              <Typography variant="body2">
                Mostre a atuação das cooperativas e empresas parceiras.
              </Typography>
            </Card>
          </Box>
        </Paper>

        {/* Divider visual */}
        <Divider sx={{ my: 2 }} />

        {/* Mapa (simulado) */}
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Pontos de Coleta (Mock)
          </Typography>

          {loadingMap ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2 }}>
              {/* Mapa simulado */}
              <Box
                sx={{
                  flex: 2,
                  bgcolor: "#e8f5e9",
                  borderRadius: 2,
                  minHeight: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  [Mapa interativo seria renderizado aqui]
                </Typography>
              </Box>

              {/* Lista de pontos */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                {pontosMock.map((ponto) => (
                  <Card key={ponto.id} sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {ponto.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📍 {ponto.endereco}
                    </Typography>
                    <Typography variant="body2">
                      ♻️ Materiais: {ponto.materiaisAceitos.join(", ")}
                    </Typography>
                    <Typography variant="body2">🕒 {ponto.horario}</Typography>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={() => handleCheckIn(ponto)}
                    >
                      Fazer Check-in
                    </Button>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Paper>

        {selectedPoint && (
          <Paper sx={{ p: 2, bgcolor: "#e8f5e9", borderRadius: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Último Check-in:
            </Typography>
            <Typography variant="body2">
              {selectedPoint.nome} - {selectedPoint.endereco}
            </Typography>
          </Paper>
        )}
      </Box>
    </>
  );
}
