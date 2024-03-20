import { createAsyncThunk } from '@reduxjs/toolkit';
import { ToDo } from '../../types/toDo';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';

export const fetchToDoById = createAsyncThunk<ToDo, void, ThunkConfig<string>>(
    'articleDetails/fetchToDoById',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<ToDo>('/todo');
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
