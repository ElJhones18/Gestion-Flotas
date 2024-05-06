import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
export const CreateUserComponent = () => {

    const dispatch = useDispatch();
    const userApi = new User();
    const [formData, setFormData] = useState({
        email:"",
        username:"",
        lastname:"",
        avatar:"",
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

    return (
        <div>
            CreateUserComponent
        </div>
    );
}
}