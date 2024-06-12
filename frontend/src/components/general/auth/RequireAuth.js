import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();

    return (

        // console.log("auth" + auth),
        // console.log("user" + auth.user),

        auth?.user
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )

}

export default RequireAuth;