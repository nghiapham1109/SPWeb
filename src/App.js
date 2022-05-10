import { React } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ThemeConfig from "./components/theme";
import Page404 from "./pages/Page404";
import Alo from "./pages/Alo";

function App() {
  return (
    <ThemeConfig>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Alo />} />
            {/* <Route path="/disease" element={<Disease />} />
          <Route path="/symptom" element={<Symptom />} />
          <Route path="/food" element={<Food />} /> */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeConfig>
  );
}

export default App;
