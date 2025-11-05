import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

// Ícones do MUI
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import PeopleIcon from "@mui/icons-material/People";
// import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BusinessIcon from '@mui/icons-material/Business';
// import ClassIcon from '@mui/icons-material/Class';
import PlaceIcon from '@mui/icons-material/Place';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import HotelClassIcon from '@mui/icons-material/HotelClass';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Recicla já" }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      {/* Header principal */}
      <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Menu hamburguer */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Título central */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {title}
          </Typography>

          {/* Notificações */}
          <IconButton color="inherit">
            <Badge badgeContent={8} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral esquerdo */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <Typography variant="h6" sx={{ p: 2 }}>
            Menu
          </Typography>
          <Divider />
          <List>
            <ListItemButton component={Link} to="/homepage" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Início" />
            </ListItemButton>

            {/* <ListItemButton component={Link} to="/dashboard" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton> */}

            <ListItemButton component={Link} to="/register-product-class" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="Pontos de Coleta" />
            </ListItemButton>


            <ListItemButton component={Link} to="/register-categories" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primary="Relatórios" />
            </ListItemButton>

            <ListItemButton component={Link} to="/register-products" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <SupportAgentIcon />
              </ListItemIcon>
              <ListItemText primary="Suporte" />
            </ListItemButton>

            <ListItemButton component={Link} to="/manage-stock" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Empresas" />
            </ListItemButton>

            <ListItemButton component={Link} to="/comprovante-digital" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <ControlCameraIcon />
              </ListItemIcon>
              <ListItemText primary="Comprovante Digital" />
            </ListItemButton>

            <ListItemButton component={Link} to="/ranking-comp" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <HotelClassIcon />
              </ListItemIcon>
              <ListItemText primary="Ranking" />
            </ListItemButton>


            {/* <ListItemButton component={Link} to="/config" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItemButton> */}

            <Divider />

            {/* Logout */}
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
