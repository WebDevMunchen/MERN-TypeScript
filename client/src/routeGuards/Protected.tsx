import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const context = useContext(AuthContext);

  return (
    <>
      {!context?.isLoading && (
        <> {context?.user ? <Outlet /> : <Navigate to={"/login"} />}</>
      )}
    </>
  );
}
