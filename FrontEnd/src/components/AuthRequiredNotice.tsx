import { SignInButton } from "@clerk/clerk-react";

export default function AuthRequiredNotice() {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        marginTop: "1rem",
        background: "#f9f9f9",
      }}
    >
      <p>You must be logged in to create a new entry.</p>
      <SignInButton mode="modal">
        <button>Log In</button>
      </SignInButton>
    </div>
  );
}