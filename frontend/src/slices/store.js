import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import driverReducer from './driverSlice';
import taskReducer from './taskSlice';
import truckReducer from './truckSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        driver: driverReducer,
        task: taskReducer,
        truck: truckReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});