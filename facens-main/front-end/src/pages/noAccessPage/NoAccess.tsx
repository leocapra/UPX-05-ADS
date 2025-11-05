// src/pages/noAccess/NoAccess.tsx
import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const NoAccess: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('nome_atendente');
    Cookies.remove('cargo');
    navigate('/login', { replace: true });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      {/* Conteúdo principal */}
      <Box
  sx={{
    flex: { xs: '1 1 100%', md: '0 0 40%' },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    maxWidth: { xs: '90%', md: 500 }, // limite de 90% da tela no mobile
    marginLeft: { xs: 1, sm: 1,  md: 'auto' },
    mx: 'auto',
    mb: { xs: 4, md: 0 },
  }}
>

  <Paper
    elevation={3}
    sx={{
      padding: { xs: 3, md: 4 },
      width: '95%',
      textAlign: 'center',
      borderRadius: 3,
      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    }}
  >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              marginBottom: 2,
              color: '#b00020',
              fontSize: { xs: '30px', md: '35px' },
            }}
          >
            Sem Acesso ao Sistema
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 1, color: '#333' }}>
            Seu acesso foi cortado ou não foi atribuído um cargo para você.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#718096', marginBottom: 3 }}
          >
            Se achar que isso é um erro, contate o administrador.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ mb: 2 }}
          >
            Sair
          </Button>

          {/* Lottie animado abaixo da mensagem */}
          <Box sx={{ mt: 3 }}>
            <DotLottiePlayer
              src="/src/lotties/failed.lottie"
              autoplay
              speed={1}
              style={{
                width: '100%',
                maxWidth: 300,
                height: 'auto',
                margin: '0 auto',
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* Área decorativa lateral opcional */}

    </Box>
  );
};

export default NoAccess;
