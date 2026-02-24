import { Role } from "../types/Role";

const leadership: Role[] = [
  { firstName: "Param", lastName: "Singh", role: "Chief Executive Officer" },
  { firstName: "Dilpreet", lastName: "Lee", role: "Chief Technology Officer" },
  { firstName: "Morgan", lastName: "Patel", role: "Chief Financial Officer" },
  { firstName: "Taylor", lastName: "Reed", role: "Director of Operations" }
];

const Organization = () => {
  return (
    <div>
      <h2>Organization Leadership</h2>
      <div>
        {leadership.map((person, idx) => (
          <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <span>{person.firstName} {person.lastName}</span>
            <span>{person.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organization;
