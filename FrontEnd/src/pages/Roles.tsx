import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import AuthRequiredNotice from "../components/AuthRequiredNotice";

type Role = {
  id: number;
  title: string;
  department: string;
};

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const { getToken } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetch(`${apiUrl}/roles`)
      .then((res) => res.json())
      .then(setRoles)
      .catch(console.error);
  }, [apiUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await getToken();

    const response = await fetch(`${apiUrl}/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, department }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.error || "Failed to create role");
      return;
    }

    const newRole = await response.json();
    setRoles((prev) => [...prev, newRole]);
    setTitle("");
    setDepartment("");
  };

  return (
    <div>
      <h1>Roles</h1>

      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.title} - {role.department}
          </li>
        ))}
      </ul>

      <SignedIn>
        <form onSubmit={handleSubmit}>
          <h2>Add Role</h2>

          <input
            type="text"
            placeholder="Role Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />

          <button type="submit">Create Role</button>
        </form>
      </SignedIn>

      <SignedOut>
        <AuthRequiredNotice />
      </SignedOut>
    </div>
  );
}