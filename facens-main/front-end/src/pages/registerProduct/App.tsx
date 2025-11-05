import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface Mensagem {
  id: number;
  autor: "usuario" | "suporte";
  texto: string;
  hora: string;
}

const RegisterProducts: React.FC = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      autor: "suporte",
      texto: "Olá! 👋 Bem-vindo ao suporte. Como posso te ajudar hoje?",
      hora: "09:00",
    },
  ]);
  const [input, setInput] = useState("");

  const enviarMensagem = () => {
    if (!input.trim()) return;

    const novaMensagem: Mensagem = {
      id: mensagens.length + 1,
      autor: "usuario",
      texto: input,
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMensagens((prev) => [...prev, novaMensagem]);
    setInput("");

    // Simula resposta automática do suporte
    setTimeout(() => {
      setMensagens((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          autor: "suporte",
          texto: "Entendido! Nossa equipe retornará em breve 😊",
          hora: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "green", textAlign: "center", mb: 1 }}
      >
        Suporte ao Cliente 💬
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Converse com nosso suporte técnico simulado.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Área principal do chat */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          height: "500px",
        }}
      >
        <List
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
            bgcolor: "#f9f9f9",
            borderRadius: 2,
            p: 1,
          }}
        >
          {mensagens.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                justifyContent:
                  msg.autor === "usuario" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={msg.texto}
                secondary={msg.hora}
                sx={{
                  bgcolor:
                    msg.autor === "usuario" ? "#c8e6c9" : "#e0e0e0",
                  borderRadius: 3,
                  px: 2,
                  py: 1,
                  maxWidth: "75%",
                  textAlign:
                    msg.autor === "usuario" ? "right" : "left",
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Campo de digitação */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
            onClick={enviarMensagem}
          >
            Enviar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterProducts;
