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
            const {
                type,
                state,
                description,
                driverId
            } = action.payload
            estado.type = type;
            estado.state = state;
            estado.description = description;
            estado.driverId = driverId;
        },
        getTasks: (estado, action) => {
            return action.payload
        },
        getTaskById: (estado, action) => {
        },
        editTaskById: (estado, action) => {
            /* const { id, type, state, description, driverId } = action.payload;
            const existingTask = state.tasks.find(task => task.id === id);
            if (existingTask) {
                existingTask.type = type;
                existingTask.state = state;
                existingTask.description = description;
                existingTask.driverId = driverId;
            } */

            const { updatedTaskData } = action.payload;
            return {
                ...estado,
                tasks: estado.tasks.map(task => task.id === updatedTaskData.id ? updatedTaskData : task)
            }
        },
        deleteTaskById: (estado, action) => {
            estado.tasks = estado.tasks.filter(task => task.id !== action.payload);
        }
    }
});

export const { addTask, getTasks, getTaskById, editTaskById, deleteTaskById } = taskSlice.actions;
export default taskSlice.reducer;