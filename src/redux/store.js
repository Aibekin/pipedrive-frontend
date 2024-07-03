import { configureStore } from '@reduxjs/toolkit';
import dealReducer from './slices/dealSlice';

export const store = configureStore({
    reducer: {
        deals: dealReducer,
    },
});