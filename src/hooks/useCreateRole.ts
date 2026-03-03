import { useFormInput } from "./useFormInput";
import { roleService } from "../services/roleService";
import type { Role } from "../types/Role";

type UseCreateRoleProps = {
  onUpdate: (roles: Role[]) => void;
};

export function useCreateRole({ onUpdate }: UseCreateRoleProps) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const roleName = useFormInput("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear old messages
    firstName.validate(() => null);
    roleName.validate(() => null);

    const result = roleService.createRole(
      firstName.value,
      lastName.value,
      roleName.value
    );

    if (!result.success) {
      // show error on firstName if it's that error, otherwise show on role field
      if ((result.message ?? "").toLowerCase().includes("first name")) {
        firstName.validate(() => result.message ?? null);
      } else {
        roleName.validate(() => result.message ?? null);
      }
      return;
    }

    onUpdate(result.data!);

    // reset
    firstName.setValue("");
    lastName.setValue("");
    roleName.setValue("");
  };

  return {
    firstName,
    lastName,
    roleName,
    handleSubmit
  };
}