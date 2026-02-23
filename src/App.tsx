import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Employees from "./pages/Employees";
import Organization from "./pages/Organization";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/employees" />} />
          <Route path="employees" element={<Employees />} />
          <Route path="organization" element={<Organization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
