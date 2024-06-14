import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchUserData } from 'entities/User/model/services/fetchUserData';

type EmailToken = {
    emailToken: string
}

export const sendActiveEmailToken = createAsyncThunk<
    undefined,
    EmailToken,
    ThunkConfig<string>
>(
    'email/sendActivateToken',
    async (emailToken, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.put('email/accept-token', emailToken);
            dispatch(fetchUserData());
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
