export type Employee = {
  firstName: string;
  lastName: string;
};

export type Department = {
  id: number;
  name: string;
  employees: Employee[];
};
