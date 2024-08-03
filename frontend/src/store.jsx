import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/slices/userSlice.jsx';
import geoReducer from '../src/slices/geoSlice.jsx';

export const store = configureStore({
    reducer: {
        user: userReducer,
        geo: geoReducer,
    },
});
