import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    drivername: "",
    lastname: "",
    cedula: "",
    phone: "",
    email: "",
    performance_driver: "",
    tasks: []
}

export const driverSlice = createSlice({
    name: "driver",
    initialState,
    reducers: {
        addDriver: (state, action) => {
            const {
                cedula,
                drivername,
                email,
                lastname,
                performance_driver,
                phone,
            } = action.payload
            console.log(action.payload)
            state.cedula = cedula;
            state.drivername = drivername;
            state.email = email;
            state.lastname = lastname;
            state.performance_driver = performance_driver;
            state.phone = phone;
        },
        getDrivers: (state, action) => {
            state.drivers = action.payload;
        },
        getDriversById: (state, action) => {
        },
        editDriverById: (state, action) => {
            const { id, cedula,
                drivername,
                email,
                lastname,
                performance_driver,
                phone, } = action.payload;
            const existingDriver = state.drivers.find(driver => driver.id === id);
            if (existingDriver) {
                existingDriver.cedula = cedula;
                existingDriver.drivername = drivername;
                existingDriver.email = email;
                existingDriver.lastname = lastname;
                existingDriver.performance_driver = performance_driver;
                existingDriver.phone = phone;
            }
        },
        deleteDriverById: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    }
});

export const { addDriver, getDrivers, getDriversById, editDriverById, deleteDriverById } = driverSlice.actions;
export default driverSlice.reducer;
