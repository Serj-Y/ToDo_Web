import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { UserSchema } from '../../../../entities/User';
import { ScrollSaveSchema } from '../../../../widgets/ScrollSave';
import { LoginSchema } from '../../../../feautures/AuthByEmail';
import { SignUpSchema } from '../../../../feautures/SignUpByEmail';
import { ToDoPageSchema } from '../../../../pages/ToDoPage/model/types/toDoPageSchema';

export interface StateSchema {
    user: UserSchema;
    scrollSave: ScrollSaveSchema
    // async reducers
    loginForm?: LoginSchema;
    signUpForm?: SignUpSchema;
    toDo?: ToDoPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void ;
    remove: (key: StateSchemaKey) => void;
    // true = mounted, false = unmaunted
    getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;

}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
