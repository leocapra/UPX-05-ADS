import React, { type JSX } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedCargos?: number[]; // cargos permitidos para esta rota
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedCargos = [] }) => {
  const token = Cookies.get("token");
  const cargo = Number(Cookies.get("cargo"));

  if (!token) {
    // Usuário não está logado
    return <Navigate to="/login" replace />;
  }

  if (!allowedCargos.includes(cargo)) {
    // Cargo não permitido
    return <Navigate to="/no-access" replace />;
  }

  // Usuário logado e com cargo permitido
  return children;
};

export default PrivateRoute;
