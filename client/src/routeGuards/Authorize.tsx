import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { Navigate, Outlet } from "react-router-dom"

export default function Authorize({ roles }: { roles: string | string[] }) {
  const context = useContext(AuthContext)
  const userRole = context?.user?.role ?? ""

  const allowedRoles = Array.isArray(roles) ? roles : [roles]

  return allowedRoles.includes(userRole)
    ? <Outlet />
    : <Navigate to="/login" />
}