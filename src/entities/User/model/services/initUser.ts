import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserInited } from '../selectors/getUserInited/getUserInited';
import { fetchUserData } from './fetchUserData';
import { userActions } from '../slice/userSlice';

export const initUser = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/initUser',
    async (_, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;

        const inited = getUserInited(getState());

        if (!inited) {
            dispatch(userActions.initState());
            dispatch(fetchUserData());
        }
    },
);
