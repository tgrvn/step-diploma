import { useSelector } from "react-redux";
import Header from "./navigation/Components/Header/Header";
import RouterConfig from "navigation/RouterConfig";
import { ColorRing } from "react-loader-spinner";

function App() {
  const { isLoad } = useSelector((state) => state.dash);
  const { isBoardLoad } = useSelector((state) => state.board);

  return (
    <div className="App">
      <Header />

      <RouterConfig />

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
