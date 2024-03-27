import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User } from '../../../../../entities/User';
import { UserResponse } from '../../../../../entities/User/model/types/user';

interface ChangePasswordProps {
    password: string,
        newPassword: string,
        repeatPassword: string
}

export const changePassword = createAsyncThunk<
    UserResponse,
    ChangePasswordProps,
    ThunkConfig<string>
>(
    'user/changePassword',
    async (changePasswordData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<UserResponse>('user/change-password', changePasswordData);
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
