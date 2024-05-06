import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { addUser } from '../../slices/userSlice';
import { User } from '../../api/user'
export const CreateUserComponent = () => {

    const dispatch = useDispatch();
    const userApi = new User();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        lastname: "",
        avatar: "",
        active_user: false
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
            formDataToSend.append("avatar", formData.avatar);
            // formDataToSend.append("current_password", formData.current_password);

            console.log(formDataToSend);

            await userApi.createUser(formDataToSend);
            dispatch(addUser(formData));
            setFormData({
                email: "",
                username: "",
                lastname: "",
                avatar: "",
                active_user: false,
                // current_password: "",
            })

        } catch (error) {

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

                {/* <div>
                    <label htmlFor='current_password'>Contraseña:</label>
                    <input
                        type='password'
                        id="current_password"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    ></input>
                </div> */}

                <div>
                    <label htmlFor='avatar'>Avatar:</label>
                    <input
                        type='file'
                        id="avatar"
                        value={formData.avatar}
                        onChange={handleAvatarChange}
                        accept='image/*'
                    ></input>
                </div>

                <button type='submit'>Create User</button>
            </form>
        </>
    );
};