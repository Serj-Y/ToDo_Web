import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User } from '../../../../../entities/User';

interface ChangePasswordProps {
    password: string,
        newPassword: string,
        repeatPassword: string
}

export const changePassword = createAsyncThunk<
    User,
    ChangePasswordProps,
    ThunkConfig<string>
>(
    'user/changePassword',
    async (changePasswordData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<User>('user/change-password', changePasswordData);
            if (!response.data) {
                throw new Error();
            }
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
