import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
} from 'shared/consts/localStorage';
import { baseApi } from 'shared/api/api';
import { UserResponse } from 'entities/User/model/types/user';
import { fetchToDo } from 'entities/ToDo/model/services/fetchToDo/fetchToDo';

interface SignUpByEmailProps {
    name: string
    email: string
    password: string
}

export const signUp = createAsyncThunk<
    UserResponse,
    SignUpByEmailProps,
    ThunkConfig<string>
>(
    'signUp/changeUserName',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await baseApi.post<UserResponse>('auth/register', authData);
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
            dispatch(fetchToDo({}));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
