import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../api/user";

export const ListComponent = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.User.users);
    const userApi = new User();

    useEffect( () => {
       userApi.getUsers();
    }, []);

    return (
        <>
            <h2>Lista de usuarios</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <span>{user.email}</span> - <span>{user.username}</span> - <span>{user.lastname}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios</p>
            )}
        </>
    )
}