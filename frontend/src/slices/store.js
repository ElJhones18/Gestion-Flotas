import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice';
import driverReducer from './driverSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        driver: driverReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});