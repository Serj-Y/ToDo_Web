import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '../../../../../entities/User';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { USER_LOCAL_STORAGE_KEY } from '../../../../../shared/const/localstorage';

interface LoginByUsernameProps {
    email: string
    password: string
}

export const loginByEmail = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/signUpByEmail',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<User>('auth/login', authData);
            console.log(response);
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
