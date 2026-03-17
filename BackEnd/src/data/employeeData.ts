import type { Department } from "../types/Department";

export let departments: Department[] = [
  {
    id: 1,
    name: "Finance",
    employees: [
      { id: 1, firstName: "Paramdeep", lastName: "Singh" },
      { id: 2, firstName: "Arsh", lastName: "Gill" }
    ]
  },
  {
    id: 2,
    name: "Marketing",
    employees: [
      { id: 3, firstName: "Tarni", lastName: "Dhillon" }
    ]
  }
];