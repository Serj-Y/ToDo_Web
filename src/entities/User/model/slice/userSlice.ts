import { createSlice } from '@reduxjs/toolkit';
import { signInByEmail } from 'feautures/Auth/SignInByEmail/model/services/signInByEmail/signInByEmail';
import { signUpByEmail } from 'feautures/Auth/SignUpByEmail/model/services/signUpByEmail/signUpByEmail';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'shared/consts/localStorage';
import { UserSchema } from '../types/user';
import { fetchUserData } from '../services/fetchUserData';
import { changePassword } from '../../../../feautures/EditUser/model/services/changePassword/changePassword';
import { changeUserName } from '../../../../feautures/EditUser/model/services/changeUserName/changeUserName';

const initialState: UserSchema = {
    error: '',
    isLoading: false,
    authData: undefined,
    _inited: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initState: (state) => {
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            state._inited = false;
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state._inited = true;
                state.authData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(signInByEmail.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signInByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state._inited = true;
                state.authData = action.payload.user;
            })
            .addCase(signInByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(signUpByEmail.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUpByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state._inited = true;
                state.authData = action.payload.user;
            })
            .addCase(signUpByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(changePassword.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state._inited = true;
                state.authData = action.payload.user;
                localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
                localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(changeUserName.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(changeUserName.fulfilled, (state, action) => {
                state.isLoading = false;
                state._inited = true;
                state.authData = action.payload;
            })
            .addCase(changeUserName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: userReducer,
    actions: userActions,
} = userSlice;
