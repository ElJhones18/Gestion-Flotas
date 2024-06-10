import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plate: "",
    brand: "",
    color: "",
    rotation_programming: "",
    fuel_consumption: "",
    model: "",
    load_capacity: "",
    photo: "",
    maintenance: [],
    tires: [],
    fuelId: "",
    driverId: "",
/*     availability: [],
    checklist: [], */
}

export const truckSlice = createSlice({
    name: "truck",
    initialState,
    reducers: {
        addTruck: (state, action) => {
            const {
                plate,
                brand,
                color,
                rotation_programming,
                fuel_consumption,
                model,
                load_capacity,
                photo,
                maintenance,
                tires,
                fuelId,
                driverId,
/*                 availability,
                checklist */
            } = action.payload
            console.log(action.payload)
            state.plate = plate;
            state.brand = brand;
            state.color = color;
            state.rotation_programming = rotation_programming;
            state.fuel_consumption = fuel_consumption;
            state.model = model;
            state.load_capacity = load_capacity;
            state.photo = photo;
            state.maintenance = maintenance;
            state.tires = tires;
            state.fuelId = fuelId;
            state.driverId = driverId;
/*             state.availability = availability;
            state.checklist = checklist; */
        },
        getTrucks: (state, action) => {
            state.trucks = action.payload;
        
        },
        getTruckById: (state, action) => {
        },
        editTruckById: (state, action) => {
            const { id, plate, brand, color, rotation_programming, fuel_consumption, model, load_capacity, photo, maintenance, tires, fuelId, driverId, availability, checklist } = action.payload;
            const existingTruck = state.trucks.find(truck => truck.id === id);
            if (existingTruck) {
                existingTruck.plate = plate;
                existingTruck.brand = brand;
                existingTruck.color = color;
                existingTruck.rotation_programming = rotation_programming;
                existingTruck.fuel_consumption = fuel_consumption;
                existingTruck.model = model;
                existingTruck.load_capacity = load_capacity;
                existingTruck.photo = photo;
                existingTruck.maintenance = maintenance;
                existingTruck.tires = tires;
                existingTruck.fuelId = fuelId;
                existingTruck.driverId = driverId;
/*                 existingTruck.availability = availability;
                existingTruck.checklist = checklist; */
            }
        },
        deleteTruckById: (state, action) => {
            state.trucks = state.trucks.filter(truck => truck.id !== action.payload);
        }
    }
});

export const { addTruck, getTrucks, getTruckById, editTruckById, deleteTruckById } = truckSlice.actions;
export default truckSlice.reducer;