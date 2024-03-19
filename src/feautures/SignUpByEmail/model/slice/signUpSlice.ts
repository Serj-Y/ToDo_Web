import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpSchema } from '../types/signUpSchema';
import { signUpByEmail } from '../services/signUpByEmail/signUpByEmail';

const initialState:SignUpSchema = {
    name: '',
    email: '',
    password: '',
    isLoading: false,
};
export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
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

// Action creators are generated for each case reducer function
export const { actions: signUpActions } = signUpSlice;
export const { reducer: signUpReducer } = signUpSlice;
