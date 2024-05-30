import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    username: "",
    lastname: "",
    avatar: "",
    active_user: false,
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
                avatar,
                active_user
            } = action.payload
            console.log(action.payload)
            state.email = email;
            state.username = username;
            state.lastname = lastname;
            state.avatar = avatar;
            state.active_user = active_user;
        },
        getUsers: (state, action) => {
            state.users = action.payload;
        },
        getUsersById: (state, action) => {
        },
        editUserById: (state, action) => {
            const { id, email, username, lastname, avatar, active_user } = action.payload;
            const existingUser = state.users.find(user => user.id === id);
            if (existingUser) {
                existingUser.email = email;
                existingUser.username = username;
                existingUser.lastname = lastname;
                existingUser.avatar = avatar;
                existingUser.active_user = active_user;
            }
        },
        deleteUserById: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    }
});

export const { addUser, getUsers, getUsersById, editUserById, deleteUserById } = userSlice.actions;
export default userSlice.reducer;
