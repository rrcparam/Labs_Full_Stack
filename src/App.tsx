import { useState } from "react";
import Header from "./components/Header";
import DepartmentSection from "./components/DepartmentSection";
import Footer from "./components/Footer";
import AddEmployeeForm from "./components/AddEmployeeForm";
import type { Department } from "./types/Department";
import "./App.css";

export default function App() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      name: "Finance",
      employees: [
        { firstName: "Paramdeep", lastName: "Singh" },
        { firstName: "Arsh", lastName: "Gill" },
        { firstName: "Manjot", lastName: "Dhanoa" },
        { firstName: "Manpreet", lastName: "Singh" },
        { firstName: "Gurmukh", lastName: "Sidhu" }
      ]
    },
    {
      name: "Marketing",
      employees: [
        { firstName: "Winder", lastName: "Dhillon" },
        { firstName: "Tarni", lastName: "Dhillon" }
      ]
    }
  ]);

  const addEmployee = (
    firstName: string,
    lastName: string,
    departmentName: string
  ) => {
    setDepartments(prev =>
      prev.map(dept =>
        dept.name === departmentName
          ? {
              ...dept,
              employees: [...dept.employees, { firstName, lastName }]
            }
          : dept
      )
    );
  };

  return (
    <>
      <Header />
      <main>
        {departments.map((dept) => (
          <DepartmentSection key={dept.name} department={dept} />
        ))}

        <AddEmployeeForm
          departments={departments.map(d => d.name)}
          onAddEmployee={addEmployee}
        />
      </main>
      <Footer />
    </>
  );
}