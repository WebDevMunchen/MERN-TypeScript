import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { Navigate, Outlet } from "react-router-dom"

export default function Authorize({role}: {role: string}) {
    const context = useContext(AuthContext)
    
    return(
        <>
        {context?.user?.role === role ? <Outlet /> : <Navigate to={"/login"} />}
        </>
    )
}