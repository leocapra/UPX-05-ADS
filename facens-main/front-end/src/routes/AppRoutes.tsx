import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/homePage/App";
import LoginRegister from "../pages/loginPage/App";
import PrivateRoute from "../components/privateRoute/privateRoute";
import NoAccess from "../pages/noAccessPage/NoAccess";
import RegisterProducts from "../pages/registerProduct/App";
import RegisterCategories from "../pages/registerCategories/App";
import ManageStock from "../pages/manageStock/App";
import RegisterProductClass from "../pages/registerProductClass/App";
import ComprovanteDigital from "../pages/comprovanteDigital/App";
import RankingCompeticoes from "../pages/rankingCompeticoes/App";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<AuthLayout />}>  
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/no-access" element={<NoAccess />} />
      </Route>

<Route element={<MainLayout />}>
  <Route
    path="/homepage"
    element={
      <PrivateRoute allowedCargos={[1, 2]}>
        <HomePage />
      </PrivateRoute>
    }
  />
</Route>

<Route element={<MainLayout />}>
  <Route
    path="/register-product-class"
    element={
      <PrivateRoute allowedCargos={[1, 2]}>
        <RegisterProductClass />
      </PrivateRoute>
    }
  />
</Route>

<Route element={<MainLayout />}>
  <Route
    path="/register-products"
    element={
      <PrivateRoute allowedCargos={[1, 2]}>
        <RegisterProducts />
      </PrivateRoute>
    }
  />
</Route>

<Route element={<MainLayout />}>
  <Route
    path="/register-categories"
    element={
      <PrivateRoute allowedCargos={[1, 2]}>
        <RegisterCategories />
      </PrivateRoute>
    }
  />
</Route>

<Route element={<MainLayout />}>
  <Route
    path="/manage-stock"
    element={
      <PrivateRoute allowedCargos={[1, 2]}>
        <ManageStock />
      </PrivateRoute>
    }
  />
</Route>

<Route element={<MainLayout />}>
  <Route
    path="/comprovante-digital"
    element={
      <PrivateRoute allowedCargos={[1, 2]}>
        <ComprovanteDigital />
      </PrivateRoute>
    }
  />
</Route>

<Route element={<MainLayout />}>
  <Route
    path="/ranking-comp"
    element={
      <PrivateRoute allowedCargos={[1, 2]}>
        <RankingCompeticoes />
      </PrivateRoute>
    }
  />
</Route>


      {/* Redireciona raiz para login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Qualquer rota não encontrada */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
