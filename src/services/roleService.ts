import { roleRepo } from "../repositories/roleRepo";

export const roleService = {
  createRole(firstName: string, lastName: string, roleName: string) {
    const f = firstName.trim();
    const l = lastName.trim();
    const r = roleName.trim();

    if (f.length < 3) {
      return { success: false, message: "First name must be at least 3 characters." };
    }

    if (!l) {
      return { success: false, message: "Last name is required." };
    }

    if (!r) {
      return { success: false, message: "Role is required." };
    }

    if (roleRepo.roleExists(r)) {
      return { success: false, message: "That role is already occupied." };
    }

    const updatedRoles = roleRepo.createRole(f, l, r);
    return { success: true, data: updatedRoles };
  }
};