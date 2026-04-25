import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const employeesQuery = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/employees`);
      if (!res.ok) throw new Error("Failed to fetch employees");
      return res.json();
    },
  });

  const rolesQuery = useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/roles`);
      if (!res.ok) throw new Error("Failed to fetch roles");
      return res.json();
    },
  });

  const createEmployeeMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const token = await getToken();

      const payload = {
        firstName: String(formData.get("firstName")),
        lastName: String(formData.get("lastName")),
        email: String(formData.get("email")),
        roleId: Number(formData.get("roleId")),
      };

      const res = await fetch(`${apiUrl}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create employee");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  if (employeesQuery.isLoading || rolesQuery.isLoading) {
    return <p>Loading data...</p>;
  }

  if (employeesQuery.isError || rolesQuery.isError) {
    return <p>Failed to load data.</p>;
  }

  const employees = employeesQuery.data ?? [];
  const roles = rolesQuery.data ?? [];

  return (
    <section>
      <h1>Employees</h1>

      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName} - {employee.email} -{" "}
            {employee.roleTitle} ({employee.department})
          </li>
        ))}
      </ul>

      <SignedIn>
        <h2>Add Employee</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createEmployeeMutation.mutate(new FormData(e.currentTarget));
            e.currentTarget.reset();
          }}
        >
          <input name="firstName" placeholder="First Name" required />
          <input name="lastName" placeholder="Last Name" required />
          <input name="email" type="email" placeholder="Email" required />

          <select name="roleId" required>
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.title} ({role.department})
              </option>
            ))}
          </select>

          <button type="submit" disabled={createEmployeeMutation.isPending}>
            {createEmployeeMutation.isPending ? "Creating..." : "Create Employee"}
          </button>
        </form>
      </SignedIn>

      <SignedOut>
        <AuthRequiredNotice />
      </SignedOut>
    </section>
  );
}