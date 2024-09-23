import React from "react";
import { Routes, Route } from "react-router-dom";
import SnackBar from "Components/SnackBar";
import { AuthContext } from "Context/Auth";
import AdminDashboardPage from "Pages/AdminDashboardPage";
import AdminListReceipts from "Pages/AdminListReceipts";
import AdminLoginPage from "Pages/AdminLoginPage";
import NotFoundPage from "Pages/NotFoundPage";

function renderRoutes(role) {
  console.log(role)
  switch ("admin") {
    case "admin":
      return (
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/receipt" element={<AdminListReceipts />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      );

    default:
      return (
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      );
  }
}

function Main() {
  const { state } = React.useContext(AuthContext);

  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full py-10 px-5">
            {renderRoutes(state.isAuthenticated ? state.role : "none")}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
