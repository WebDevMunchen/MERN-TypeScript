import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const context = useContext(AuthContext);

  return (
    <nav>
      {!context?.isLoading && (
        <>
          <NavLink to={"/"}>Home</NavLink>
          {!context?.user ? (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/register"}>Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/events"}>Events</NavLink>
              <NavLink to={"/admin/userProfile"}>Profile</NavLink>
              <button onClick={() => context.logout()}>Logout</button>
            </>
          )}
        </>
      )}
    </nav>
  );
}
