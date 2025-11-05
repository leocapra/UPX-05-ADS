import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import RecyclingIcon from "@mui/icons-material/Recycling";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Ponto = {
  id: number;
  nome: string;
  endereco: string;
  materiais: string[];
  horario: string;
};

const RegisterProductClass = () => {
  const [ultimoCheckin, setUltimoCheckin] = useState<Ponto | null>(null);

  // --- Dados simulados ---
  const pontos: Ponto[] = [
    {
      id: 1,
      nome: "EcoPonto Central",
      endereco: "Rua das Flores, 120 - Centro",
      materiais: ["Plástico", "Papel", "Vidro"],
      horario: "08h às 18h",
    },
    {
      id: 2,
      nome: "Recicla Sul",
      endereco: "Av. das Palmeiras, 890 - Jardim Sul",
      materiais: ["Metal", "Eletrônicos"],
      horario: "09h às 17h",
    },
    {
      id: 3,
      nome: "Coleta Verde Norte",
      endereco: "Rua Limeira, 55 - Zona Norte",
      materiais: ["Plástico", "Pilhas", "Papelão"],
      horario: "07h às 16h",
    },
  ];

  const handleCheckIn = (ponto: Ponto) => {
    toast.success(`✅ Check-in realizado em ${ponto.nome}`);
    setUltimoCheckin(ponto);
  };

  return (
    <Box sx={{ p: 4 }}>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "green", textAlign: "center", mb: 2 }}
      >
        Pontos de Coleta ♻️
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Encontre locais próximos e registre seus descartes de forma sustentável.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 3,
        }}
      >
        {pontos.map((ponto) => (
          <Card
            key={ponto.id}
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {ponto.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <RoomIcon sx={{ fontSize: 18, mr: 0.5 }} />
                {ponto.endereco}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <RecyclingIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  Materiais aceitos: {ponto.materiais.join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  Horário: {ponto.horario}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => handleCheckIn(ponto)}
              >
                Fazer Check-in
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {ultimoCheckin && (
        <Paper
          sx={{
            mt: 4,
            p: 2,
            bgcolor: "#e8f5e9",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CheckCircleIcon color="success" />
          <Typography variant="body1">
            Último check-in:{" "}
            <strong>
              {ultimoCheckin.nome} - {ultimoCheckin.endereco}
            </strong>
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default RegisterProductClass;
