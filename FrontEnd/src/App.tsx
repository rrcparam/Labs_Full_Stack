import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Organization from "./pages/Organization";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/roles" element={<Organization />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}