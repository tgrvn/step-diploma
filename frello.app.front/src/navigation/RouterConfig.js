import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PrivateRoute from "navigation/PrivateRoute";
import * as paths from "./CONSTANTS";
import Home from "pages/Home/Home";
import Auth from "pages/Auth/Auth";
import Singup from "pages/Auth/Components/Singup/Singup";
import Login from "pages/Auth/Components/Login/Login";
import Dashboard from "pages/Dashboard/Dashboard";
import Board from "pages/Board/Board";
import CardModal from "components/CardModal/CardModal";
import Invite from "pages/Invite/invite";

export default function RouterConfig() {
  const location = useNavigate();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={paths.WELCOME} />} />
        <Route path={paths.WELCOME} element={<Home />} />
        <Route path={paths.SIGNUP} element={<Auth child={<Singup />} />} />
        <Route path={paths.LOGIN} element={<Auth child={<Login />} />} />
        <Route
          path={paths.DASHBOARD}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.BOARD}
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.CARD}
          element={
            <PrivateRoute>
              <CardModal />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.INVITE}
          element={
            <PrivateRoute>
              <Invite />
            </PrivateRoute>
          }
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={paths.CARD}
            element={
              <PrivateRoute>
                <CardModal />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}
