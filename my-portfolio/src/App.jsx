import {} from "react";
import Index from "./pages/Index";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Index />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{ backgroundColor: "#1e293b", color: "#fff" }}
      />
    </div>
  );
}

export default App;
