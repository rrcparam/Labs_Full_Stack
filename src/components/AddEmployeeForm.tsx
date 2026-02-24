import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";
import type { Department } from "../types/Department";

type Props = {
  departments: Department[];
  onUpdate: (departments: Department[]) => void;
};

export default function AddEmployeeForm({ departments, onUpdate }: Props) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");

  // SAFE initialization
  const initialDepartmentId =
    departments[0]?.id !== undefined
      ? departments[0].id.toString()
      : "";

  const departmentId = useFormInput(initialDepartmentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = employeeService.createEmployee(
      firstName.value,
      lastName.value,
      Number(departmentId.value)
    );

    if (!result.success) {
      firstName.validate(() => result.message ?? null);
      return;
    }

    onUpdate(result.data!);

    // Optional reset after success
    firstName.setValue("");
    lastName.setValue("");
  };

  return (
    <section>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={firstName.value}
          onChange={(e) => firstName.setValue(e.target.value)}
          placeholder="First Name"
        />
        {firstName.message && <p>{firstName.message}</p>}

        <input
          value={lastName.value}
          onChange={(e) => lastName.setValue(e.target.value)}
          placeholder="Last Name"
        />

        <select
          value={departmentId.value}
          onChange={(e) => departmentId.setValue(e.target.value)}
        >
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id.toString()}>
              {dep.name}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>
    </section>
  );
}