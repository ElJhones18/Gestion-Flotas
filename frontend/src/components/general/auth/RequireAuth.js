import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {

    const { auth } = useAuth();
    const location = useLocation();
    return (

        // console.log("auth" + auth),
        // console.log("user" + auth.user),

        allowedRoles.includes(auth?.role)
            ? <Outlet />
            : auth?.user
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )

}

export default RequireAuth;