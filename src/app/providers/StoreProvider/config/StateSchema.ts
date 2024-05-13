import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { UserSchema } from 'entities/User';
import { ScrollSaveSchema } from 'widgets/ScrollSave';
import { SignInSchema } from 'feautures/Auth/SignInByEmail';
import { SignUpSchema } from 'feautures/Auth/SignUpByEmail';
import { ToDoSchema } from 'entities/ToDo';

export interface StateSchema {
    scrollSave: ScrollSaveSchema
    toDo: ToDoSchema;
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

}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
