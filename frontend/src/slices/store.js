import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import driverReducer from './driverSlice';
import taskReducer from './taskSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        driver: driverReducer,
        task: taskReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});