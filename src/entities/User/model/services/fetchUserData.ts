import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchUserData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>(
    'user',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<User>('user/');
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
