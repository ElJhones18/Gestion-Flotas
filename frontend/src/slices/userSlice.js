import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    username: "",
    lastname: "",
    avatar: "",
    active_user: ""
}


export const userSlide = createSlice ({
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

        }
    },
    getUsers: (state, action) => {
    },
    getUsersById: (state, action) => { 
    },
    editUserById: (state, action) => {
    },
    deleteUserById: (state, action) => {
    }

});

export const {addUser, getUsers, getUsersById, editUserById, deleteUser} = userSlide.actions;
export default userSlide.reducer;
