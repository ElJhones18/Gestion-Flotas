import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    id: "",
    distance: "",
    origin: "",
    destination: "",
    stops: [],
    driverId: ""
}]

export const travelSlice = createSlice({
    name: "travel",
    initialState,
    reducers: {
        addTravel: (estado, action) => {
            const {
                distance,
                origin,
                destination,
                stops,
                driverId
            } = action.payload
            estado.distance = distance
            estado.origin = origin
            estado.destination = destination
            estado.stops = stops
            estado.driverId = driverId
        },
        getTravels: (estado, action) => {
            return action.payload
        },
        getTravelById: (estado, action) => {
        },
        editTravelById: (estado, action) => {
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
        deleteTravelById: (estado, action) => {
            estado.tasks = estado.tasks.filter(task => task.id !== action.payload);
        }
    }
});

export const { addTask, getTasks, getTaskById, editTaskById, deleteTaskById } = travelSlice.actions;
export default travelSlice.reducer;