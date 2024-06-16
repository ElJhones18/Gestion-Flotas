import { createSlice } from '@reduxjs/toolkit';

const initialState = [{
    cost: Number,
    efficiency: "",
    brand: "",
    truck: [],
}]

export const fuelSlice = createSlice({
    name: 'fuel',
    initialState,
    reducers: {
        addFuel: (state, action) => {
            const {
                cost,
                efficiency,
                brand,
                truck,
            } = action.payload
            state.cost = cost;
            state.efficiency = efficiency;
            state.brand = brand;
            state.truck = truck;
        },
        getFuels: (state, action) => {
            return action.payload
        },
        getFuelById: (state, action) => {
            return action.payload
        },
        editFuelById: (state, action) => {
            const {
                id,
                cost,
                efficiency,
                brand,
                truck,
            } = action.payload
            const fuelExists = state.find(fuel => fuel.id === id);
            if (fuelExists) {
                fuelExists.cost = cost;
                fuelExists.efficiency = efficiency;
                fuelExists.brand = brand;
                fuelExists.truck = truck;
            }
        },
        deleteFuelById: (state, action) => {
            state.fuel = state.fuel.filter(fuel => fuel.id !== action.payload)
        }
    }
});

export const { addFuel, getFuels, getFuelById, editFuelById, deleteFuelById } = fuelSlice.actions;
export default fuelSlice.reducer;   