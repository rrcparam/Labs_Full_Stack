export const roleRepo = {
  async getRoles() {
    const res = await fetch("http://localhost:3001/roles");

    if (!res.ok) {
      throw new Error("Failed to fetch roles");
    }

    return res.json();
  },

  async addRole(
    role: { title: string; department: string },
    token: string | null
  ) {
    const res = await fetch("http://localhost:3001/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(role),
    });

    if (!res.ok) {
      throw new Error("Failed to add role");
    }

    return res.json();
  },
};