import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Header() {
  return (
    <header>
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/roles">Roles</Link>

        <div style={{ marginLeft: "auto" }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button>Sign In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}