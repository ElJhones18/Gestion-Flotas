import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
    truck: [],
    users: [],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {
                email,
                username,
                lastname,
                cedula,
                phone,
                rol,
                performance_driver,
                avatar,
                active_user,
                history_travel,
                tasks,
                truck
            } = action.payload
            console.log(action.payload)
            state.email = email;
            state.username = username;
            state.lastname = lastname;
            state.cedula = cedula;
            state.phone = phone;
            state.rol = rol;
            state.performance_driver = performance_driver;
            state.avatar = avatar;
            state.active_user = active_user;
            state.history_travel = history_travel;
            state.tasks = tasks;
            state.truck = truck;
        },
        getUsers: (state, action) => {
            /* state.users = action.payload; */
            return action.payload
        },
        getUsersById: (state, action) => {
        },
        editUserById: (state, action) => {
            const { id, email, username, lastname, cedula, phone, rol, performance_driver, avatar, active_user, history_travel, tasks, truck } = action.payload;
            const existingUser = state.users.find(user => user.id === id);
            if (existingUser) {
                existingUser.email = email;
                existingUser.username = username;
                existingUser.lastname = lastname;
                existingUser.cedula = cedula;
                existingUser.phone = phone;
                existingUser.rol = rol;
                existingUser.performance_driver = performance_driver;
                existingUser.avatar = avatar;
                existingUser.active_user = active_user;
                existingUser.history_travel = history_travel;
                existingUser.tasks = tasks;
                existingUser.truck = truck;
            }
        },
        deleteUserById: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    }
});

export const { addUser, getUsers, getUsersById, editUserById, deleteUserById } = userSlice.actions;
export default userSlice.reducer;
