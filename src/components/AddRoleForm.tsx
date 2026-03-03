type InputModel = {
  value: string;
  setValue: (v: string) => void;
  message: string;
};

type Props = {
  firstName: InputModel;
  lastName: InputModel;
  roleName: InputModel;
  onSubmit: (e: React.FormEvent) => void;
};

export default function AddRoleForm(props: Props) {
  return (
    <section>
      <h2>Add Role</h2>

      <form onSubmit={props.onSubmit}>
        <input
          value={props.firstName.value}
          onChange={(e) => props.firstName.setValue(e.target.value)}
          placeholder="First Name (min 3 chars)"
        />
        {props.firstName.message && <p>{props.firstName.message}</p>}

        <input
          value={props.lastName.value}
          onChange={(e) => props.lastName.setValue(e.target.value)}
          placeholder="Last Name"
        />

        <input
          value={props.roleName.value}
          onChange={(e) => props.roleName.setValue(e.target.value)}
          placeholder="Role (must be unique)"
        />
        {props.roleName.message && <p>{props.roleName.message}</p>}

        <button type="submit">Add</button>
      </form>
    </section>
  );
}