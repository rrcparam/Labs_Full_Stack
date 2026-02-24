import { employeeRepo } from "../repositories/employeeRepo";
import DepartmentSection from "../components/DepartmentSection";

export default function Employees() {
  const departments = employeeRepo.getDepartments();

  return (
    <main className="employees-page">
      <header className="employees-header">
        <h1>Company Directory</h1>
        <p>Meet the talented people behind each department.</p>
      </header>

      <section className="departments-container">
        {departments.map((dept) => (
          <div key={dept.id} className="department-wrapper">
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