import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { Box } from "@mui/material";

export default function MainLayout() {
  return (
    <>
      <Header title="Recicla já" />
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)", 
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
