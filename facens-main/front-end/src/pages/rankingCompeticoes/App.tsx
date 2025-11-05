import { useState, type JSX } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Avatar,
  useMediaQuery,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// --- Tipagens ---
interface Usuario {
  nome: string;
  pontos: number;
  avatarUrl?: string;
}

// --- Mock de dados ---
const topNacional: Usuario[] = [
  { nome: "Alice Oliveira", pontos: 980 },
  { nome: "Bruno Lima", pontos: 870 },
  { nome: "Carla Souza", pontos: 820 },
];

const rankingRegional: Usuario[] = [
  { nome: "Daniela Costa", pontos: 650 },
  { nome: "Eduardo Mendes", pontos: 620 },
  { nome: "Fernanda Ribeiro", pontos: 610 },
  { nome: "Gabriel Santos", pontos: 600 },
  { nome: "Helena Martins", pontos: 590 },
];

const amigos: Usuario[] = [
  { nome: "Igor Almeida", pontos: 400 },
  { nome: "Julia Carvalho", pontos: 350 },
  { nome: "Lucas Pereira", pontos: 320 },
];

// --- Função para pegar o ícone do troféu ---
const getTrophyIcon = (index: number) => {
  if (index === 0) return <EmojiEventsIcon sx={{ color: "#FFD700" }} />; // ouro
  if (index === 1) return <EmojiEventsIcon sx={{ color: "#C0C0C0" }} />; // prata
  if (index === 2) return <EmojiEventsIcon sx={{ color: "#CD7F32" }} />; // bronze
  return null;
};

// --- Componente ---
export default function RankingCompeticoes(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTop] = useState(topNacional);
  const [selectedRegional] = useState(rankingRegional);
  const [selectedAmigos] = useState(amigos);

  const renderLista = (usuarios: Usuario[]) => (
    <List>
      {usuarios.map((user, idx) => (
        <ListItem key={idx} sx={{ gap: 2 }}>
          <ListItemAvatar>
            <Avatar src={user.avatarUrl}>{user.nome[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontWeight: "bold" }}>{user.nome}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  {idx < 3 && getTrophyIcon(idx)}
                  <Typography>{user.pontos} pts</Typography>
                  <Typography sx={{ color: "text.secondary" }}>#{idx + 1}</Typography>
                </Box>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ p: isMobile ? 2 : 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "green", textAlign: "center" }}>
        Ranking & Competições 🏆
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "center" }}>
        Incentive a participação e acompanhe seu desempenho
      </Typography>

      {/* Top 3 Nacional */}
      <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3, bgcolor: "#f4f9f4" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Top 3 Nacional
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {renderLista(selectedTop)}
      </Paper>

      {/* Ranking Regional */}
      <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3, bgcolor: "#f4f9f4" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Ranking Regional
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {renderLista(selectedRegional)}
      </Paper>

      {/* Lista de Amigos */}
      <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3, bgcolor: "#f4f9f4" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Amigos
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {renderLista(selectedAmigos)}
      </Paper>
    </Box>
  );
}
