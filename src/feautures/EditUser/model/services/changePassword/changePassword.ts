import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface ChangePasswordProps {
    password: string,
        newPassword: string,
        repeatPassword: string
}
type ChangePasswordResponse = {
    _id: string,
    name: string,
    email: string
    emailActivate: boolean,
    updatedAt: string
}
export const changePassword = createAsyncThunk<
    ChangePasswordResponse,
    ChangePasswordProps,
    ThunkConfig<string>
>(
    'user/changePassword',
    async (changePasswordData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<ChangePasswordResponse>('user/change-password', changePasswordData);
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
