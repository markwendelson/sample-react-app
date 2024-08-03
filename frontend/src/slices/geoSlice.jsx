import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../http-common.jsx';

// Async thunk for fetching geolocation info
export const fetchGeoInfo = createAsyncThunk('geo/fetchGeoInfo', async (ip, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/geo/${ip}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for adding to history
export const addHistory = createAsyncThunk('geo/addHistory', async (ip, { rejectWithValue }) => {
    try {
        await axios.post('/api/history', { ip }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return ip;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for fetching history
export const fetchHistory = createAsyncThunk('geo/fetchHistory', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/history', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for deleting multiple history items
export const deleteHistory = createAsyncThunk('geo/deleteHistory', async (ids, { rejectWithValue }) => {
    try {
        await axios.post('/api/history/delete', { ids }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return ids;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const geoSlice = createSlice({
    name: 'geo',
    initialState: {
        geoInfo: null,
        history: [],
        selectedHistory: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        toggleHistorySelection: (state, action) => {
            const id = action.payload;
            if (state.selectedHistory.includes(id)) {
                state.selectedHistory = state.selectedHistory.filter(itemId => itemId !== id);
            } else {
                state.selectedHistory.push(id);
            }
        },
        clearSelectedHistory: (state) => {
            state.selectedHistory = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeoInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGeoInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.geoInfo = action.payload;
            })
            .addCase(fetchGeoInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addHistory.fulfilled, (state, action) => {
                state.history.push({ ip: action.payload });
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.history = action.payload;
            })
            .addCase(deleteHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteHistory.fulfilled, (state, action) => {
                state.history = state.history.filter(item => !action.payload.includes(item.id));
                state.selectedHistory = [];
            })
            .addCase(deleteHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { toggleHistorySelection, clearSelectedHistory } = geoSlice.actions;
export default geoSlice.reducer;
