import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Singup from "./pages/Singup/Singup";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Board from "./pages/Board/Board";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import CardModal from "./components/CardModal/CardModal";
import Invite from "./pages/Invite/invite";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoad } = useSelector((state) => state.dash);
  const { isBoardLoad } = useSelector((state) => state.board);
  const location = useNavigate();
  const background = location.state && location.state.background;
  return (
    <div className="App">
      <Header auth={isLoggedIn} />

      <Routes>
        <Route path="/" element={<Navigate to={"/welcome"} />} />
        <Route path="/welcome" element={<Home />} />
        <Route path="/signup" element={<Auth child={<Singup />} />} />
        <Route path="/login" element={<Auth child={<Login />} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invite/:token" element={<Invite />} />
        <Route path="/board/:boardId" element={<Board />}>
          <Route path="/board/:boardId/card/:cardId" element={<CardModal />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/board/:boardId/card/:cardId" element={<CardModal />} />
        </Routes>
      )}

      {isLoad || isBoardLoad ? (
        <div className="load-wrapper">
          <ColorRing
            visible={true}
            height="200px"
            width="200px"
            colors={["#0747a6", "#f47e60", "#0065ff", "#fff", "#5e6c84"]}
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;
