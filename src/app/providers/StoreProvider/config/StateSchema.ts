import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance, AxiosResponse } from 'axios';
import { UserSchema } from 'entities/User';
import { ScrollSaveSchema } from 'widgets/ScrollSave';
import { SignInSchema } from 'feautures/Auth/SignInByEmail';
import { SignUpSchema } from 'feautures/Auth/SignUpByEmail';
import { ToDoSchema } from 'entities/ToDoList';
import { toDoApiServices } from '../../../../entities/ToDoList/model/services/toDoApiServices';

export interface StateSchema {
    scrollSave: ScrollSaveSchema
    // toDoList: ToDoSchema;
    // @ts-ignore
    [toDoApiServices.reducerPath]: toDoApiServices.reducer;
    // async reducers
    user?: UserSchema;
    signInForm?: SignInSchema;
    signUpForm?: SignUpSchema;
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
    // api: ({ baseUrl }?: { baseUrl: string; }) => ({
    //     url, method, data, params, headers, body,
    // }: any) => Promise<AxiosResponse<any, any>>

}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
