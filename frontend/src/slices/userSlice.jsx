import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../http-common.jsx';

// Async thunk for login
export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data.token;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Logout action
export const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
    localStorage.removeItem('token');
    dispatch(clearUser());
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token') || null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.token = null;
            });
    },
});

export const { clearUser  } = userSlice.actions;
export default userSlice.reducer;
