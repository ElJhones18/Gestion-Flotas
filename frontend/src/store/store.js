import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slides/userSlide'

const store = configureStore({
    reducer: {
       user:userReducer
    }
});

export default store;