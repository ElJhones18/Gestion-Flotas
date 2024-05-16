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
        },
        deleteUserById: (state, action) => {
        }
    }
});

export const { addUser, getUsers, getUsersById, editUserById, deleteUserById } = userSlice.actions;
export default userSlice.reducer;
