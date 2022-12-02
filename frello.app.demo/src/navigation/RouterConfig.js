import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import * as paths from "./CONSTANTS";
import Board from "pages/Board/Board";
import CardModal from "pages/CardModal/CardModal";
import Navbar from "./Navbar/Navbar";

export default function RouterConfig() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={paths.BOARD} />} />
        <Route path={paths.BOARD} element={<Board />}>
          <Route path={paths.CARD} element={<CardModal />} />
        </Route>
        <Route path={paths.PATH404} element={<Navigate to={paths.BOARD} />} />
      </Routes>

      {background && (
        <Routes>
          <Route path={paths.CARD} element={<CardModal />} />
        </Routes>
      )}
    </>
  );
}
