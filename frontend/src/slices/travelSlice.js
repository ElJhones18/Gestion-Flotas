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
            /* const { id, type, state, description, driverId } = action.payload;
            const existingTravel = state.travels.find(travel => travel.id === id);
            if (existingTravel) {
                existingTravel.type = type;
                existingTravel.state = state;
                existingTravel.description = description;
                existingTravel.driverId = driverId;
            } */

            const { updatedTravelData } = action.payload;
            return {
                ...state,
                travels: state.trav.map(travel => travel.id === updatedTravelData.id ? updatedTravelData : travel)
            }
        },
        deleteTravelById: (state, action) => {
            state.travels = state.travels.filter(travel => travel.id !== action.payload);
        }
    }
});

export const { addTravel, getTravels, getTravelById, editTravelById, deleteTravelById } = travelSlice.actions;
export default travelSlice.reducer;