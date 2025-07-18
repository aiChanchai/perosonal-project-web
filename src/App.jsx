import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" style={{ zIndex: 9999 }} />
    </>
  );
}

export default App;
