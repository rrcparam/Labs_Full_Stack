import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DepartmentSection from "./components/DepartmentSection";
import AddEmployeeForm from "./components/AddEmployeeForm";
import { employeeRepo } from "./repositories/employeeRepo";
import type { Department } from "./types/Department";
import "./App.css";

export default function App() {
  const [departments, setDepartments] = useState<Department[]>(
    employeeRepo.getDepartments()
  );

  return (
    <>
      <Header />

      <main>
        {departments.map((dept) => (
          <DepartmentSection
            key={dept.id}
            department={dept}
          />
        ))}

        <AddEmployeeForm
          departments={departments}
          onUpdate={setDepartments}
        />
      </main>

      <Footer />
    </>
  );
}