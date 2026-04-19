import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./Routes/allRoutes";
import StartField from "./components/StartField";
import Orbitalk from './assets/images/Icon.png'

function App() {
  return (
    <BrowserRouter>
      <div className="root-bg">
        <div className="blob blob--left" />
        <div className="blob blob--right" />
        <StartField />
        <header className="topbar">
          <div className="topbar__brand">
            <img src={Orbitalk} alt="Orbitalk" className="topbar_icon" />
            ORBITALK
          </div>
        </header>
        <AllRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
