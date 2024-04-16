import { createSlice } from '@reduxjs/toolkit';
import { SignUpSchema } from '../types/signUpSchema';
import { signUpByEmail } from '../services/signUpByEmail/signUpByEmail';

const initialState:SignUpSchema = {
    isLoading: false,
    error: undefined,
};
export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUpByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signUpByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: signUpActions } = signUpSlice;
export const { reducer: signUpReducer } = signUpSlice;
