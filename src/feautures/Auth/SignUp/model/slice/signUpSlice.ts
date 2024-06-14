import { createSlice } from '@reduxjs/toolkit';
import { SignUpSchema } from '../types/signUpSchema';
import { signUp } from '../services/signUp/signUp';

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
            .addCase(signUp.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: signUpActions } = signUpSlice;
export const { reducer: signUpReducer } = signUpSlice;
