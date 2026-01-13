document.addEventListener("DOMContentLoaded", () => {
  const departments = [
    {
      name: "Finance",
      employees: [
        { firstName: "paramdeep", lastName: "singh" },
        { firstName: "Arsh", lastName: "Gill" },
        { firstName: "Manjot ", lastName: "Dhanoa" },
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

  const main = document.getElementById("employee-directory");

  departments.forEach(dept => {
    const section = document.createElement("section");
    section.classList.add("department");

    const h2 = document.createElement("h2");
    h2.textContent = dept.name;

    const ul = document.createElement("ul");

    dept.employees.forEach(emp => {
      const li = document.createElement("li");
      li.textContent = `${emp.firstName} ${emp.lastName || ""}`;
      ul.appendChild(li);
    });

    section.appendChild(h2);
    section.appendChild(ul);
    main.appendChild(section);
  });

  // This is Footer 
  const year = new Date().getFullYear();
  document.getElementById("copyright").textContent =
    `Copyright Pixell River Financial ${year}.`;
});
