import type { Department } from "../types/Department";

interface Props {
  department: Department;
}

export default function DepartmentSection({ department }: Props) {
  return (
    <section className="department">
      <h2>{department.name}</h2>
      <ul>
        {department.employees.map((emp, index) => (
          <li key={index}>
            {emp.firstName} {emp.lastName}
          </li>
        ))}
      </ul>
    </section>
  );
}

