import {
    configureStore, Reducer, ReducersMapObject, CombinedState,
} from '@reduxjs/toolkit';
import { scrollSaveReducer } from 'widgets/ScrollSave';
import localStorage from 'redux-persist/lib/storage';
import {
    createMigrate,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { toDoApiServices } from 'entities/ToDoList/model/services/toDoApiServices';
import { $api } from 'shared/api/api';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

const rootMigrations = {
    3: (state: any) => ({
        ...state,
    }),
};

const persistConfig = {
    key: 'app',
    version: 3,
    storage: localStorage,
    migrate: createMigrate(rootMigrations),
    blacklist: ['scrollSave', 'signInForm', 'signUpForm'],
    whitelist: [
        'user',
        'toDoApiServices',
    ],
};

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        [toDoApiServices.reducerPath]: toDoApiServices.reducer,
        scrollSave: scrollSaveReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const reducers = persistReducer(
        persistConfig,
        reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    );
    const store = configureStore({
        reducer: reducers,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(
            toDoApiServices.middleware,
        ),
    });
    // @ts-ignore
    store.reducerManager = reducerManager;
    setupListeners(store.dispatch);
    return store;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
