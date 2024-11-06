import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProfile = createAsyncThunk('user/fetchProfile', async (token) => {
    const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.length > 0) {
        return response.data[0]; 
    } else {
        return null; 
    }
});

const initialState = {
    profile: null,
    available: false,
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            console.log('Profile updated:', action.payload);
            state.profile = action.payload;
            state.available = true;
        },
        clearProfile: (state) => {
            state.profile = null;
            state.available = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.profile = action.payload;
                    state.available = true;
                }
                state.loading = false;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
