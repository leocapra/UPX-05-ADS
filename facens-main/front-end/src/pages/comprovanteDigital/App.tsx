import { useState, type JSX } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShareIcon from "@mui/icons-material/Share";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Tipagem ---
interface Comprovante {
  tecnico: string;
  pontoColeta: string;
  materiais: string[];
  data: string; // string formatada
}

// --- Mock de dados ---
const comprovanteMock: Comprovante = {
  tecnico: "Leonardo Capra",
  pontoColeta: "EcoPonto Central",
  materiais: ["Plástico", "Papel", "Vidro"],
  data: new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
};

// --- Componente ---
export default function ComprovanteDigital(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [comprovante] = useState<Comprovante>(comprovanteMock);
  const [confirmado, setConfirmado] = useState(false);

  const handleConfirmar = () => {
    setConfirmado(true);
    toast.success("Confirmação eletrônica registrada com sucesso ✅", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
    });
  };

  const handleCompartilhar = () => {
    toast.info("Simulação: compartilhando comprovante...", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
    });
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ p: isMobile ? 2 : 4, display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            width: isMobile ? "100%" : 400,
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: "#f4f9f4",
          }}
        >
          {/* Header */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "green", textAlign: "center", mb: 2 }}
          >
            Comprovante Eletrônico de Destinação ♻️
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Dados do comprovante */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body1">
              <strong>Técnico:</strong> {comprovante.tecnico}
            </Typography>
            <Typography variant="body1">
              <strong>Ponto de Coleta:</strong> {comprovante.pontoColeta}
            </Typography>
            <Typography variant="body1">
              <strong>Materiais Destinados:</strong> {comprovante.materiais.join(", ")}
            </Typography>
            <Typography variant="body1">
              <strong>Data/Hora:</strong> {comprovante.data}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Ações */}
          <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleIcon />}
              fullWidth
              onClick={handleConfirmar}
              disabled={confirmado}
            >
              {confirmado ? "Confirmado" : "Confirmar Destinação"}
            </Button>
            <Button
              variant="outlined"
              color="success"
              startIcon={<ShareIcon />}
              fullWidth
              onClick={handleCompartilhar}
            >
              Compartilhar
            </Button>
          </Box>

          {confirmado && (
            <Typography
              variant="body2"
              color="green"
              sx={{ textAlign: "center", mt: 2, fontWeight: "bold" }}
            >
              ✅ Destinação correta registrada
            </Typography>
          )}
        </Paper>
      </Box>
    </>
  );
}
