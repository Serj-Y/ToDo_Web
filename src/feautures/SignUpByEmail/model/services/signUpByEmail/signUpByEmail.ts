import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '../../../../../entities/User';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { USER_LOCAL_STORAGE_KEY } from '../../../../../shared/consts/localStorage';
import { baseApi } from '../../../../../shared/api/api';

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
    'signUp/signUpByEmail',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await baseApi.post<User>('auth/register', authData);
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
