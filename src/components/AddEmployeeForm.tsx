import { useState } from "react";

type Props = {
  departments: string[];
  onAddEmployee: (firstName: string, lastName: string, department: string) => void;
};

export default function AddEmployeeForm({ departments, onAddEmployee }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    if (firstName.trim().length < 3) {
      setError("First name must be at least 3 characters long.");
      return;
    }

    if (!departments.includes(department)) {
      setError("Please select a valid department.");
      return;
    }

    onAddEmployee(firstName.trim(), lastName.trim(), department);

    //This can  Reset form
    setFirstName("");
    setLastName("");
    setDepartment(departments[0]);
  };

  return (
    <section className="add-employee">
      <h2>Add New Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map(dep => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}
