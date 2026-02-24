import DepartmentSection from "../components/DepartmentSection";
import type { Department } from "../types/Department";

const departments: Department[] = [
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
];

export default function Employees() {
  return (
    <main className="employees-page">
      <header className="employees-header">
        <h1>Company Directory</h1>
        <p>Meet the talented people behind each department.</p>
      </header>

      <section className="departments-container">
        {departments.map((dept) => (
          <div key={dept.name} className="department-wrapper">
            <h2 className="department-title">
              {dept.name} Department
              <span className="employee-count">
                ({dept.employees.length} Employees)
              </span>
            </h2>

            <DepartmentSection department={dept} />
          </div>
        ))}
      </section>
    </main>
  );
}
