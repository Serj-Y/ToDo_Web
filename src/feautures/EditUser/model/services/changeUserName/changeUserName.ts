import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';
import { fetchUserData } from '../../../../../entities/User/model/services/fetchUserData';

interface EditUserNameProps {
    name: string
}
type EditUserNameResponse = {
    _id: string,
    name: string,
    email: string
    emailActivate: boolean,
    updatedAt: string
}
export const changeUserName = createAsyncThunk<
    EditUserNameResponse,
    EditUserNameProps,
    ThunkConfig<string>
>(
    'user/changeUserName',
    async (newUserName, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.patch<EditUserNameResponse>('user/', newUserName);
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
