import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

type ResetPasswordData = {
    email?: string
    forgotToken: string
    password: string
}

export const sendForgotPasswordToken = createAsyncThunk<
    undefined,
    ResetPasswordData,
    ThunkConfig<string>
>(
    'auth/sendForgotPasswordToken',
    async (resetPasswordData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        console.log(resetPasswordData);
        try {
            const response = await extra.api.put('forgot/accept-token', resetPasswordData);
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
