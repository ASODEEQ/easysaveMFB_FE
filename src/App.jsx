import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgotpass from "./pages/Forgotpass";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./Auth/Authguard";
import Transferesave from "./pages/Transferesave";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
        <Route path="/dashboard" element={<Navigate to={"/dashboard/:id"} />} />
        <Route element={<AuthGuard isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/transferesave" element={<Transferesave/>}/>

        </Route>
      </Routes>
    </>
  );
};

export default App;
