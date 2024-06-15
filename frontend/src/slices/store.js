import { configureStore } from '@reduxjs/toolkit'
import driverReducer from './driverSlice';
import taskReducer from './taskSlice';
import travelReducer from './travelSlice';
import truckReducer from './truckSlice';
import userReducer from './userSlice';
import tireReducer from './tireSlice';

export const store = configureStore({
    reducer: {
        driver: driverReducer,
        task: taskReducer,
        travel: travelReducer,
        truck: truckReducer,
        user: userReducer,
        tire: tireReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});