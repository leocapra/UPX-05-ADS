import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

export default function AuthLayout() {
  return (
    <Box >
      <Container > 
        <Outlet />
      </Container>
    </Box>
  );
}
