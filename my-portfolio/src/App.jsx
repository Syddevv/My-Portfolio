import {} from "react";
import Index from "./pages/Index";
import { ToastContainer } from "react-toastify";
import Projects from "./pages/Projects";
import { Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";

function App() {
  // const [snowColor, setSnowColor] = useState("#fff");

  // useEffect(() => {
  //   const updateSnowColor = () => {
  //     const isDark = document.documentElement.classList.contains("dark");
  //     setSnowColor(isDark ? "#ffffff" : "#00b7eb  ");
  //   };

  //   updateSnowColor();

  //   const observer = new MutationObserver(() => {
  //     updateSnowColor();
  //   });

  //   observer.observe(document.documentElement, {
  //     attributes: true,
  //     attributeFilter: ["class"],
  //   });

  //   return () => observer.disconnect();
  // }, []);

  return (
    <div>
      {/* <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 100,
          pointerEvents: "none",
        }}
        color={snowColor}
        snowflakeCount={100}
        speed={[1, 2.5]}
        wind={[1, 2.5]}
        radius={[0.5, 3, 5]}
      /> */}
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
