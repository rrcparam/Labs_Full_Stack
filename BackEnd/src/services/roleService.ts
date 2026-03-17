import { roleRepository } from "../repositories/roleRepository";

export const roleService = {
  getRoles() {
    return roleRepository.getRoles();
  },

  addRole(firstName: string, lastName: string, roleName: string) {
    const f = firstName.trim();
    const l = lastName.trim();
    const r = roleName.trim();

    if (f.length < 3) {
      throw new Error("First name must be at least 3 characters.");
    }

    if (!l) {
      throw new Error("Last name is required.");
    }

    if (!r) {
      throw new Error("Role is required.");
    }

    if (roleRepository.roleExists(r)) {
      throw new Error("That role is already occupied.");
    }

    return roleRepository.addRole(f, l, r);
  }
};