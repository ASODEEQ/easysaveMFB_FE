import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgotpass from "./pages/Forgotpass";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./Auth/Authguard";
import Transferesave from "./pages/Transferesave";
import Deposit from "./pages/Deposit";

import Notfound from "./pages/Notfound";
import TransactionHistory from "./pages/components/TransactionHistory";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");
  // const id = localStorage.getItem('id')
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
        <Route path="/dashboard" element={<Navigate to={"/dashboard/:id"} />} />
        <Route element={<AuthGuard isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/transferfunds/:id" element={<Transferesave/>}/>
          <Route path="/deposit/:id" element={<Deposit/>}/>
         <Route path="/transactions/:id" element={<TransactionHistory/>}/>
         <Route path="*" element={<Notfound/>}/>

        </Route>
      </Routes>
    </>
  );
};

export default App;
