export const employeeRepo = {
  async getEmployees() {
    const res = await fetch("http://localhost:3001/employees");
    return res.json();
  },

  async addEmployee(employee: any) {
    const res = await fetch("http://localhost:3001/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    });

    return res.json();
  }
};