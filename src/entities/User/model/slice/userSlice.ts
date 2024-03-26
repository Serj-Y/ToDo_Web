import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { loginByEmail } from 'feautures/AuthByEmail/model/services/loginByEmail/loginByEmail';
import { signUpByEmail } from 'feautures/SignUpByEmail/model/services/signUpByEmail/signUpByEmail';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'shared/consts/localStorage';
import { User, UserSchema } from '../types/user';
import { authUserData } from '../services/authUserData';

// const initialState:UserSchema = {
//     _inited: false,
// };
// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setAuthData: (state, action: PayloadAction<User>) => {
//             state.authData = action.payload;
//         },
//         initAuthData: (state) => {
//             const accessToken = localStorage.getItem(ACCESS_TOKEN);
//             const user = localStorage.getItem(USER_AUTH_DATA);
//
//             if (accessToken && user) {
//                 state.authData = JSON.parse(user);
//                 state._inited = true;
//             } else {
//                 state.authData = undefined;
//                 state._inited = false;
//                 localStorage.removeItem(USER_AUTH_DATA);
//             }
//         },
//         logout: (state) => {
//             state.authData = undefined;
//             state._inited = false;
//             localStorage.removeItem(USER_AUTH_DATA);
//             localStorage.removeItem(ACCESS_TOKEN);
//             localStorage.removeItem(REFRESH_TOKEN);
//         },
//     },
// });

const userAdapter = createEntityAdapter<User>({
    selectId: (user) => user._id,
});

const userSlice = createSlice({
    name: 'user',
    initialState: userAdapter.getInitialState<UserSchema>({
        error: '',
        isLoading: false,
        authData: undefined,
        _inited: false,
    }),
    reducers: {
        initState: (state) => {
            state._inited = true;
        },
        setAuthData: (state, action) => {
            state._inited = true;
            console.log(state);
            state.authData = action.payload;
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
            .addCase(authUserData.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                console.log('panding');
            })
            .addCase(authUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state._inited = true;
                userAdapter.setOne(state, action.payload);
                console.log(action.payload);
            })
            .addCase(authUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(loginByEmail.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                userAdapter.removeAll(state);
            })
            .addCase(loginByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                userAdapter.setOne(state, action.payload.user);
                console.log(action.payload.user);
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(signUpByEmail.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUpByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                userAdapter.setOne(state, action.payload.user);
            })
            .addCase(signUpByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: userReducer,
    actions: userActions,
} = userSlice;
