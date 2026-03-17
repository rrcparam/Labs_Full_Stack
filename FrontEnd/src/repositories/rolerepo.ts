export const roleRepo = {
  async getRoles() {
    const res = await fetch("http://localhost:3001/roles");

    if (!res.ok) {
      throw new Error("Failed to fetch roles");
    }

    return res.json();
  },

  async addRole(role: { title: string }) {
    const res = await fetch("http://localhost:3001/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(role)
    });

    if (!res.ok) {
      throw new Error("Failed to add role");
    }

    return res.json();
  }
};