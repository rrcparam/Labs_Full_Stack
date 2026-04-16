import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import AuthRequiredNotice from "../components/AuthRequiredNotice";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  roleTitle: string;
  department: string;
};

type Role = {
  id: number;
  title: string;
  department: string;
};

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const { getToken } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetch(`${apiUrl}/employees`)
      .then((res) => res.json())
      .then(setEmployees)
      .catch(console.error);

    fetch(`${apiUrl}/roles`)
      .then((res) => res.json())
      .then(setRoles)
      .catch(console.error);
  }, [apiUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await getToken();

    const response = await fetch(`${apiUrl}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        roleId: Number(roleId),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.error || "Failed to create employee");
      return;
    }

    const newEmployee = await response.json();
    setEmployees((prev) => [...prev, newEmployee]);

    setFirstName("");
    setLastName("");
    setEmail("");
    setRoleId("");
  };

  return (
    <div>
      <h1>Employees</h1>

      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName} - {employee.email} - {employee.roleTitle}
          </li>
        ))}
      </ul>

      <SignedIn>
        <form onSubmit={handleSubmit}>
          <h2>Add Employee</h2>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.title} ({role.department})
              </option>
            ))}
          </select>

          <button type="submit">Create Employee</button>
        </form>
      </SignedIn>

      <SignedOut>
        <AuthRequiredNotice />
      </SignedOut>
    </div>
  );
}