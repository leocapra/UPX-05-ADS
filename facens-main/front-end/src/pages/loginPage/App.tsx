/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { authService } from '../../services/authService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";


/* --- Schemas --- */
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'Senha mínima de 6 caracteres')
    .required('Campo obrigatório'),
});

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  name: Yup.string().required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'Senha mínima de 6 caracteres')
    .required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Campo obrigatório'),
  cnpj: Yup.string()
    .length(14, 'CNPJ deve ter 14 dígitos')
    .required('Campo obrigatório'),
});

/* --- Types --- */
interface LoginValues {
  email: string;
  password: string;
}
interface RegisterValues extends LoginValues {
  confirmPassword: string;
  cnpj: string;
}

const LoginRegister: React.FC = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* Mantive TODA a lógica original */

  const handleLogin = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      const response = await authService.loginUser(values);
      const { token, user } = response.data;

      const now = new Date();
      const logoutTime = new Date();
      logoutTime.setHours(1, 0, 0, 0);
      if (now > logoutTime) logoutTime.setDate(logoutTime.getDate() + 1);
      const msUntilLogout = logoutTime.getTime() - now.getTime();
      const hoursUntilLogout = msUntilLogout / (1000 * 60 * 60);

      Cookies.set('token', token, { expires: hoursUntilLogout / 24 });
      Cookies.set('nome_atendente', user.name, { expires: hoursUntilLogout / 24 });
      Cookies.set('cargo', user.role_id, { expires: hoursUntilLogout / 24 });

      setIsLoading(false);
      toast.success('Logado com sucesso!');

      if (user.role_id === 6) {
        navigate('/no-access');
      } else {
        navigate('/homepage');
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Não estabelecida a conexão com o servidor!';
      toast.error(msg);
      setIsLoading(false);
    }
  };

  const handleRegister = async (values: RegisterValues, { resetForm }: any) => {
    setIsLoading(true);
    try {
      await authService.registerUser(values);
      resetForm();
      setIsRegister(false);
      setIsLoading(false);

      toast.success('Cadastro realizado com sucesso!');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Erro ao registrar!';
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        '@media (max-width: 750px)': {
          flexDirection: 'column',
        },
      }}
    >
{/* Banner */}
<Box
  sx={{
    flex: '0 0 60%',
    height: '100vh',
    position: 'relative',
    display: { xs: 'none', md: 'block' },
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
    overflow: 'hidden',
  }}
>
  <DotLottiePlayer
    src="/src/lotties/login.lottie"
    autoplay
    speed={0.5} 
    style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      objectFit: "cover",
      pointerEvents: "none",
    }}
  />

  <Typography
    variant="h6"
    sx={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      color: 'rgba(255,255,255,0.7)',
      fontSize: '14px',
      fontWeight: 500,
      textAlign: 'left',
      userSelect: 'none',
      pointerEvents: 'none',
    }}
  >
    Versão de teste
    <br />
    Ambiente controlado
    <br />
    Desenvolvido por Leonardo Capra
  </Typography>
</Box>


      {/* Form */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '0 0 40%' },
          display: 'flex',
          maxWidth: { xs: '100%', sm: '500px' },
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          height: '100vh',
          mx: 'auto',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: { xs: '30px', md: '40px' },
            width: '100%',
            backgroundColor: 'transparent',
            boxShadow: 'none !important',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              color: '#1e3a8a',
              marginBottom: '30px',
              fontSize: { xs: '28px', md: '36px' },
            }}
          >
            Recicla Já
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ color: '#718096', marginBottom: '40px', fontSize: '16px' }}
          >
            {isRegister
              ? 'Crie sua conta para acessar o sistema'
              : 'Faça login para acessar o sistema'}
          </Typography>

          <Formik
            initialValues={
              isRegister
                ? {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    cnpj: '',
                  }
                : { email: '', password: '' }
            }
            validationSchema={isRegister ? RegisterSchema : LoginSchema}
            onSubmit={(values, actions) =>
              isRegister
                ? handleRegister(values as RegisterValues, actions)
                : handleLogin(values as LoginValues)
            }
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                {!isRegister && (
                  <>
                    <Field
                      as={TextField}
                      label="Email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      as={TextField}
                      label="Senha"
                      name="password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </>
                )}

                {isRegister && (
                  <>
                    <Field
                      as={TextField}
                      label="Nome"
                      name="name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <Field
                      as={TextField}
                      label="Email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      as={TextField}
                      label="Senha"
                      name="password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Field
                      as={TextField}
                      label="Repetir Senha"
                      name="confirmPassword"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    <Field
                      as={TextField}
                      label="CNPJ"
                      name="cnpj"
                      variant="outlined"
                      inputProps={{ maxLength: 14 }}
                      fullWidth
                      margin="normal"
                      error={touched.cnpj && Boolean(errors.cnpj)}
                      helperText={touched.cnpj && errors.cnpj}
                    />
                  </>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!(isValid && dirty)}
                  sx={{
                    mt: 2,
                    bgcolor: '#2563eb',
                    '&:hover': { bgcolor: '#1e40af' },
                  }}
                >
                  {isLoading
                    ? isRegister
                      ? 'Registrando...'
                      : 'Entrando...'
                    : isRegister
                    ? 'Registrar'
                    : 'Entrar'}
                </Button>

                <Button
                  type="button"
                  variant="text"
                  fullWidth
                  sx={{ mt: 1, textTransform: 'none' }}
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister
                    ? 'Já tem conta? Fazer login'
                    : 'Registrar'}
                </Button>

                <Typography
                  variant="body2"
                  align="center"
                  sx={{ marginTop: '20px', color: '#a0aec0' }}
                >
                  © 2025 Recicla Já System. Todos os direitos reservados.
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Box>
  );
};

export default LoginRegister;
