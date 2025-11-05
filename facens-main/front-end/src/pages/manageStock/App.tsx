import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";

interface Empresa {
  id: number;
  nome: string;
  setor: string;
  descricao: string;
  logo: string;
}

const ManageStock: React.FC = () => {
  const empresas: Empresa[] = [
    {
      id: 1,
      nome: "EcoTech Brasil",
      setor: "Tecnologia Sustentável",
      descricao:
        "Desenvolve soluções digitais para rastreamento de resíduos e otimização da coleta seletiva.",
      logo: "https://via.placeholder.com/80?text=EcoTech",
    },
    {
      id: 2,
      nome: "ReciclaMais Co.",
      setor: "Reciclagem Industrial",
      descricao:
        "Parceira oficial no processamento e reuso de materiais recicláveis coletados.",
      logo: "https://via.placeholder.com/80?text=Recicla",
    },
    {
      id: 3,
      nome: "VerdeVida LTDA",
      setor: "Educação Ambiental",
      descricao:
        "Promove campanhas educativas e programas de conscientização sobre descarte correto.",
      logo: "https://via.placeholder.com/80?text=VerdeVida",
    },
    {
      id: 4,
      nome: "Prefeitura Verde",
      setor: "Administração Pública",
      descricao:
        "Colabora com a plataforma para coleta e análise de dados municipais de reciclagem.",
      logo: "https://via.placeholder.com/80?text=Prefeitura",
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "green", textAlign: "center", mb: 1 }}
      >
        Parceiros e Empresas 🌱
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Conheça algumas das empresas que apoiam a sustentabilidade e a inovação ambiental.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Lista de parceiros */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {empresas.map((empresa) => (
          <Paper
            key={empresa.id}
            sx={{
              width: 280,
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 6,
              },
            }}
          >
            <Avatar
              src={empresa.logo}
              alt={empresa.nome}
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto 12px auto",
                bgcolor: "#e8f5e9",
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "green" }}>
              {empresa.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {empresa.setor}
            </Typography>
            <Typography variant="body2">{empresa.descricao}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ManageStock;
