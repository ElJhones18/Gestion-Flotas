import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    id: "",
    type: "",
    state: "",
    description: "",
    driverId: ""
}]

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (estado, action) => {
            return [...estado, action.payload]
        },
        getTasks: (estado, action) => {
            return action.payload
        },
        getTaskById: (estado, action) => {
        },
        editTaskById: (estado, action) => {
            return estado.map(task => task.id === action.payload.id ? action.payload : task)
        },
        deleteTaskById: (estado, action) => {
            return estado.filter(task => task.id !== action.payload);
        }
    }
});

export const { addTask, getTasks, getTaskById, editTaskById, deleteTaskById } = taskSlice.actions;
export default taskSlice.reducer;