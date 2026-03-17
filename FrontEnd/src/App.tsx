import { useEffect, useState } from "react";
import Header from "./components/Header";
import DepartmentSection from "./components/DepartmentSection";
import Footer from "./components/Footer";
import AddEmployeeForm from "./components/AddEmployeeForm";
import type { Department } from "./types/Department";
import "./App.css";

type BackendEmployee = {
  id?: number;
  firstName: string;
  lastName: string;
  departmentId?: number;
  department?: string | { id?: number; name?: string };
  departmentName?: string;
  name?: string;
};

type BackendDepartment = {
  id?: number;
  name: string;
  employees: {
    id?: number;
    firstName: string;
    lastName: string;
  }[];
};

export default function App() {
  const [departments, setDepartments] = useState<Department[]>([]);

  const normalizeDepartments = (data: unknown): Department[] => {
    if (!Array.isArray(data)) return [];

    if (
      data.length > 0 &&
      typeof data[0] === "object" &&
      data[0] !== null &&
      "employees" in data[0] &&
      "name" in data[0]
    ) {
      return (data as BackendDepartment[]).map((dept) => ({
        id: dept.id ?? 0,
        name: dept.name,
        employees: dept.employees.map((emp) => ({
          firstName: emp.firstName,
          lastName: emp.lastName
        }))
      })) as Department[];
    }

    const grouped = (data as BackendEmployee[]).reduce<Record<string, Department>>(
      (acc, employee) => {
        let deptName = "";
        let deptId = employee.departmentId ?? 0;

        if (typeof employee.department === "string") {
          deptName = employee.department;
        } else if (
          employee.department &&
          typeof employee.department === "object"
        ) {
          deptName = employee.department.name ?? "";
          deptId = employee.department.id ?? deptId;
        } else if (employee.departmentName) {
          deptName = employee.departmentName;
        } else if (employee.name) {
          deptName = employee.name;
        }

        if (!deptName) return acc;

        if (!acc[deptName]) {
          acc[deptName] = {
            id: deptId,
            name: deptName,
            employees: []
          } as Department;
        }

        acc[deptName].employees.push({
          firstName: employee.firstName,
          lastName: employee.lastName
        });

        return acc;
      },
      {}
    );

    return Object.values(grouped);
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:3001/employees");

      if (!res.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await res.json();
      const normalized = normalizeDepartments(data);
      setDepartments(normalized);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setDepartments([]);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const addEmployee = async (
    firstName: string,
    lastName: string,
    departmentName: string
  ) => {
    try {
      const selectedDepartment = departments.find(
        (dept) => dept.name === departmentName
      );

      if (!selectedDepartment) {
        throw new Error("Department not found");
      }

      const res = await fetch("http://localhost:3001/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          departmentId: (selectedDepartment as any).id
        })
      });

      if (!res.ok) {
        throw new Error("Failed to add employee");
      }

      await fetchDepartments();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <>
      <Header />
      <main>
        {departments.map((dept) => (
          <DepartmentSection key={dept.name} department={dept} />
        ))}

        <AddEmployeeForm
          departments={departments.map((d) => d.name)}
          onAddEmployee={addEmployee}
        />
      </main>
      <Footer />
    </>
  );
}