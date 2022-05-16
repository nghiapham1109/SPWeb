import { React } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ThemeConfig from "./components/theme";
import Page404 from "./pages/Page404";
import Alo from "./pages/Alo";
import Disease from "./pages/Disease";
import Doctor from "./pages/Doctor";
import DoctorHandle from "./pages/DoctorHandle";

function App() {
  return (
    <ThemeConfig>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Alo />} />
            <Route path="/disease" element={<Disease />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/doctorhandle" element={<DoctorHandle />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeConfig>
  );
}

export default App;
