import type { Role } from "../types/Role";

let nextRoleId = 1;

let roles: Role[] = [
  { id: nextRoleId++, firstName: "Param", lastName: "Singh", role: "Chief Executive Officer" },
  { id: nextRoleId++, firstName: "Dilpreet", lastName: "Lee", role: "Chief Technology Officer" },
  { id: nextRoleId++, firstName: "Morgan", lastName: "Patel", role: "Chief Financial Officer" }
];

export const roleRepo = {
  getRoles(): Role[] {
    return roles;
  },

  roleExists(roleName: string): boolean {
    const normalized = roleName.trim().toLowerCase();
    return roles.some(r => r.role.trim().toLowerCase() === normalized);
  },

  createRole(firstName: string, lastName: string, roleName: string): Role[] {
    const newRole: Role = {
      id: nextRoleId++,
      firstName,
      lastName,
      role: roleName
    };

    roles = [newRole, ...roles];
    return roles;
  },

  deleteRole(id: number): Role[] {
    roles = roles.filter(r => r.id !== id);
    return roles;
  }
};