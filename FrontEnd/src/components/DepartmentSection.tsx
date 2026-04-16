import type { Department } from "../types/Department";

type Props = {
  department: Department;
};

export default function DepartmentSection({ department }: Props) {
  return (
    <section className="department">
      <h2>{department.name}</h2>

      {department.employees.length === 0 ? (
        <p>No employees in this department.</p>
      ) : (
        <ul>
          {department.employees.map((emp, index) => (
            <li key={index}>
              {emp.firstName} {emp.lastName}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}


