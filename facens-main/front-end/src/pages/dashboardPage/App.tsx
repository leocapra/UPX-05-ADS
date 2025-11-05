// src/pages/Dashboard.tsx
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header'; // ajuste o caminho se necessário

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <>
      {/* Header sempre no topo */}
      <Header />

      {/* Conteúdo do Dashboard */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)', // 64px é altura padrão do AppBar
          p: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Bem-vindo ao Dashboard
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;
