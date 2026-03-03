import { useState } from "react";
import type { Role } from "../types/Role";
import { roleRepo } from "../repositories/roleRepo";
import AddRoleForm from "../components/AddRoleForm";
import { useCreateRole } from "../hooks/useCreateRole";

export default function Organization() {
  const [roles, setRoles] = useState<Role[]>(roleRepo.getRoles());

  const form = useCreateRole({ onUpdate: setRoles });

  return (
    <main className="employees-page">
      <header className="employees-header">
        <h1>Organization Leadership</h1>
        <p>Add leadership roles (Role must be unique).</p>
      </header>

      <AddRoleForm
        firstName={form.firstName}
        lastName={form.lastName}
        roleName={form.roleName}
        onSubmit={form.handleSubmit}
      />

      <section className="departments-container">
        {roles.length === 0 ? (
          <p>No roles yet.</p>
        ) : (
          <ul>
            {roles.map((r) => (
              <li key={r.id}>
                <b>{r.role}</b> — {r.firstName} {r.lastName}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}