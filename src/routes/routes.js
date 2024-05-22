import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { PrivateProvider } from "@/context/Private";
import { CreateCategory } from "@/pages/private/CreateCategory";
import { Home as HomePrivate } from "@/pages/private/Home";
import { Home as HomePublic } from "@/pages/public/Home";
import { Login } from "@/pages/public/Login";
import { SignUp } from "@/pages/public/SignUp";

const RoutesApp = () => (
  <BrowserRouter>
    <Routes>
      <Route
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route path="/" element={<HomePublic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <PrivateProvider>
              <Outlet />
            </PrivateProvider>
          </PrivateRoute>
        }
      >
        <Route path="/home" element={<HomePrivate />} />
        <Route path="/createCategory" element={<CreateCategory />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RoutesApp;
