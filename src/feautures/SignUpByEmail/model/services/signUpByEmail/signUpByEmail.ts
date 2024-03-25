import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    USER_AUTH_DATA,
} from 'shared/consts/localStorage';
import { baseApi } from 'shared/api/api';

interface SignUpByEmailProps {
    name: string
    email: string
    password: string
}

export const signUpByEmail = createAsyncThunk<
    User,
    SignUpByEmailProps,
    ThunkConfig<string>
>(
    'signUp/changeUserName',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await baseApi.post<User>('auth/register', authData);
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
            localStorage.setItem(USER_AUTH_DATA, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
