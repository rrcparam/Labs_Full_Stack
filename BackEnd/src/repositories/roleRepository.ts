import { roles } from "../data/roleData";
import type { Role } from "../types/Role";

let nextRoleId = 3;

export const roleRepository = {
  getRoles(): Role[] {
    return roles;
  },

  roleExists(roleName: string): boolean {
    return roles.some(
      (r) => r.role.trim().toLowerCase() === roleName.trim().toLowerCase()
    );
  },

  addRole(firstName: string, lastName: string, roleName: string): Role[] {
    const newRole: Role = {
      id: nextRoleId++,
      firstName,
      lastName,
      role: roleName
    };

    roles.push(newRole);
    return roles;
  }
};