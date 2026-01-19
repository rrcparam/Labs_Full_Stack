import Header from "./components/Header";
import DepartmentSection from "./components/DepartmentSection";
import Footer from "./components/Footer";
import type { Department } from "./types/Department";

const departments: Department[] = [
  {
    name: "Finance",
    employees: [
      { firstName: "paramdeep", lastName: "singh" },
      { firstName: "Arsh", lastName: "Gill" },
      { firstName: "Manjot", lastName: "Dhanoa" },
      { firstName: "Manpreet", lastName: "Singh" },
      { firstName: "Gurmukh", lastName: "Sidhu" }
    ]
  },
  {
    name: "Marketing",
    employees: [
      { firstName: "winder", lastName: "Dhillon" },
      { firstName: "Tarni", lastName: "Dhillon" }
    ]
  }
];

export default function App() {
  return (
    <>
      <Header />
      <main>
        {departments.map((dept) => (
          <DepartmentSection key={dept.name} department={dept} />
        ))}
      </main>
      <Footer />
    </>
  );
}
