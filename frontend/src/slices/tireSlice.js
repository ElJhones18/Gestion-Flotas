import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    brand : "",
    wear : "",
    truckId : ""
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
            estado.brand = brand;
            estado.wear = wear;
            estado.truckId = truckId;
        },
        getTires: (estado, action) => {
            return action.payload
        },
        getTireById: (estado, action) => {
            return action.payload
        },
        editTireById: (estado, action) => {
            const {
                id,
                brand,
                wear,
                truckId
            } = action.payload
            const tireExists = estado.find(tire => tire.id === id);
            if (tireExists) {
                tireExists.brand = brand;
                tireExists.wear = wear;
                tireExists.truckId = truckId;
            }
        },
        deleteTireById: (estado, action) => {
            return estado.filter(tire => tire.id !== action.payload);
        }
    }
});

export const { addTire, getTires, getTireById, editTireById, deleteTireById } = tireSlice.actions;
export default tireSlice.reducer;