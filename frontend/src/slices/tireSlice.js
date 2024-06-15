import { createSlice } from '@reduxjs/toolkit';

const initialState = [{
    id: "",
    brand: "",
    wear: "",
    truckId: ""
}]

export const tireSlice = createSlice({
    name: "tire",
    initialState,
    reducers: {
        addTire: (estado, action) => {
            const {
                brand,
                wear,
                truckId
            } = action.payload
            estado.brand = brand
            estado.wear = wear
            estado.truckId = truckId
        },
        getTires: (estado, action) => {
            return action.payload
        },
        getTireById: (estado, action) => {
        },
        editTireById: (estado, action) => {

            const { id, brand, wear, truckId } = action.payload;
            const existingTire = estado.tasks.find(task => task.id === id);
            if (existingTire) {
                existingTire.brand = brand;
                existingTire.wear = wear;
                existingTire.truckId = truckId;
            }

            const { updatedTaskData } = action.payload;
            return {
                ...estado,
                tasks: estado.tasks.map(task => task.id === updatedTaskData.id ? updatedTaskData : task)
            }
        },
        deleteTireById: (estado, action) => {
            estado.tasks = estado.tasks.filter(task => task.id !== action.payload);
        }
    }
});

export const { addTire, getTires, getTireById, editTireById, deleteTireById } = tireSlice.actions;
export default tireSlice.reducer;