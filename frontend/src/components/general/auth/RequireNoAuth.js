import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireNoAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();
    return (
        console.log(auth == {}),
        !auth?.user
            ? <Outlet />
            : <Navigate to='/home' state={{ from: location }} replace />
    )

}

export default RequireNoAuth;