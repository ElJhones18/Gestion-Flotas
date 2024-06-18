import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    distance: "",
    origin: "",
    destination: "",
    stops: [],
    driverId: "",
    truckId: ""
}]

export const travelSlice = createSlice({
    name: "travel",
    initialState,
    reducers: {
        addTravel: (state, action) => {
            const {
                distance,
                origin,
                destination,
                stops,
                driverId,
                truckId
            } = action.payload
            state.distance = distance
            state.origin = origin
            state.destination = destination
            state.stops = stops
            state.driverId = driverId
            state.truckId = truckId

        },
        getTravels: (state, action) => {
            return action.payload
        },
        getTravelById: (state, action) => {
        },
        editTravelById: (state, action) => {
            return state.map(travel => travel.id === action.payload.id ? action.payload : travel)
        },
        deleteTravelById: (state, action) => {
            return state.filter(travel => travel.id !== action.payload);
        }
    }
});

export const { addTravel, getTravels, getTravelById, editTravelById, deleteTravelById } = travelSlice.actions;
export default travelSlice.reducer;