import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInSchema } from '../types/signInSchema';
import { signIn } from '../services/signIn/signIn';

const initialState:SignInSchema = {
    email: '',
    password: '',
    isLoading: false,
};
export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signIn.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: signInActions } = signInSlice;
export const { reducer: signInReducer } = signInSlice;
