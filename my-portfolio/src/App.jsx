import {} from "react";
import Index from "./pages/Index";
import { ToastContainer } from "react-toastify";
import Projects from "./pages/Projects";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>

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
