import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./Routes/allRoutes";
import StartField from "./components/StartField";
import Orbitalk from "./assets/images/Icon.png";
import { ToastContainer, Zoom } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="root-bg">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
        />
        <div className="blob blob--left" />
        <div className="blob blob--right" />
        <StartField />
       
        <AllRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
