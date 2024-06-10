import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { addUser } from '../../../slices/userSlice';
import { User } from '../../../api/user'
export const CreateUserComponent = () => {

    const dispatch = useDispatch();
    const userApi = new User();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        lastname: "",
        cedula: "",
        phone: "",
        rol: "",
        performance_driver: "",
        avatar: "",
        active_user: false,
        history_travel: [],
        tasks: [],
        truck: []
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleAvatarChange = (event) => {
        setFormData({
            ...formData,
            avatar: event.target.files[0]
        });
    }

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("email", formData.email);
            formDataToSend.append("username", formData.username);
            formDataToSend.append("lastname", formData.lastname);
            formDataToSend.append("cedula", formData.cedula);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("rol", formData.rol);
            formDataToSend.append("performance_driver", formData.performance_driver);
            formDataToSend.append("avatar", formData.avatar);
            formDataToSend.append("active_user", formData.active_user);
            formDataToSend.append("history_travel", formData.history_travel);
            formDataToSend.append("tasks", formData.tasks);
            formDataToSend.append("truck", formData.truck);

            console.log("formDataToSend: ", formDataToSend);
            
            await userApi.createUser(formDataToSend);
            dispatch(addUser(formData));
            setFormData({
                email: "",
                username: "",
                lastname: "",
                cedula: "",
                phone: "",
                rol: "",
                performance_driver: "",
                avatar: "",
                active_user: false,
                history_travel: [],
                tasks: [],
                truck: []
            })

        } catch (error) {
            console.log("Error al crear usuario: ", error);
        }
    }


    return (
        <>
            <h2>Create User</h2>
            <form onSubmit={handleCreateUser} encType='multipart/form-data'>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor='username'>Nombre(s):</label>
                    <input
                        type='text'
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    ></input>
                </div>

                <div>
                    <label htmlFor='lastname'>Apellido(s):</label>
                    <input
                        type='text'
                        id="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    ></input>
                </div>

                <div> 
                    <label htmlFor='cedula'>Cedula:</label>
                    <input
                        type='text'
                        id="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                        required
                    ></input>
                </div>

                <div>
                    <label htmlFor='phone'>Telefono:</label>
                    <input
                        type='text'
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    ></input>
                </div>

                <div>
                    <label htmlFor='rol'>Rol:</label>
                    <input
                        type='text'
                        id="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        required
                    ></input>
                </div>

                <div>
                    <label htmlFor='performance_driver'>Performance Driver:</label>
                    <input
                        type='text'
                        id="performance_driver"
                        value={formData.performance_driver}
                        onChange={handleChange}
                    ></input>
                </div>

                <div>
                    <label htmlFor='avatar'>Avatar:</label>
                    <input
                        type='file'
                        id="avatar"
                        //value={formData.avatar}
                        onChange={handleAvatarChange}
                    ></input>
                </div>

                <button type='submit'>Create User</button>
            </form>
        </>
    );
};