import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_AUTH_DATA } from 'shared/consts/localStorage';
import { User, UserSchema } from '../types/user';

const initialState:UserSchema = {
    _inited: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            const user = localStorage.getItem(USER_AUTH_DATA);

            if (accessToken && user) {
                state.authData = JSON.parse(user);
                state._inited = true;
            } else {
                state.authData = undefined;
                state._inited = false;
                localStorage.removeItem(USER_AUTH_DATA);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            state._inited = false;
            localStorage.removeItem(USER_AUTH_DATA);
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
