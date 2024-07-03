import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const addDeal = createAsyncThunk('deals/addDeal', async (deal) => {
    const response = await axios.post('/add', deal);
    return response.data;
});

const dealSlice = createSlice({
    name: 'deals',
    initialState: {
        deals: [],
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addDeal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addDeal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deals.push(action.payload);
            })
            .addCase(addDeal.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default dealSlice.reducer;