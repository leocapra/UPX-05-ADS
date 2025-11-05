import {
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RegisterCategories = () => {

  // --- Dados mockados ---
  const dadosMateriais = [
    { nome: "Plástico", valor: 45 },
    { nome: "Papel", valor: 30 },
    { nome: "Vidro", valor: 15 },
    { nome: "Metal", valor: 10 },
  ];

  const dadosMensais = [
    { mes: "Jan", descartes: 120 },
    { mes: "Fev", descartes: 180 },
    { mes: "Mar", descartes: 260 },
    { mes: "Abr", descartes: 220 },
    { mes: "Mai", descartes: 300 },
    { mes: "Jun", descartes: 280 },
  ];

  const cores = ["#4caf50", "#81c784", "#388e3c", "#66bb6a"];

  return (
    <Box sx={{ p: 4 }}>
      {/* Cabeçalho */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "green", textAlign: "center", mb: 1 }}
      >
        Relatórios e Métricas 📈
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Acompanhe o desempenho das coletas e o volume de reciclagem.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Área dos gráficos */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Gráfico de Pizza */}
        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Distribuição por Tipo de Material
          </Typography>

          <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dadosMateriais}
                  dataKey="valor"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {dadosMateriais.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={cores[index % cores.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* Gráfico de Barras */}
        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Descartes por Mês (Simulado)
          </Typography>

          <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={dadosMensais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="descartes" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>

      {/* Resumo */}
      <Paper
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "#e8f5e9",
          borderRadius: 3,
          textAlign: "center",
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "green" }}>
          Resumo Simulado
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Total de pontos ativos: <strong>15</strong> <br />
          Volume total reciclado: <strong>1.360 kg</strong> <br />
          Check-ins realizados este mês: <strong>312</strong>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterCategories;
