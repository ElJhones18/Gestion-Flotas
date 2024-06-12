import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const PersistLogin = () => {
    const [loading, setLoading] = useState(true);
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const loadAuth = () => {
            const user = localStorage.getItem("user");
            const role = localStorage.getItem("role");
            const token = localStorage.getItem("token");

            setAuth({ user, role, token });
            setLoading(false);
        }

        !auth?.token ? loadAuth() : setLoading(false);
    }, [])

    // useEffect(() => {
    //     console.log("is loading: ", loading);
    //     console.log("token: ", auth?.token);
    // }, [loading])

    return (
        loading ? <div>Cargando...</div> : <Outlet />
    )
}

export default PersistLogin;