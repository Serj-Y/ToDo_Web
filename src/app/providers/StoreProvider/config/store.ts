import {
    configureStore, Reducer, ReducersMapObject, CombinedState,
} from '@reduxjs/toolkit';
import { scrollSaveReducer } from 'widgets/ScrollSave';
import { $api } from 'shared/api/api';
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
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

const rootMigrations = {
    5: (state: any) => ({
        ...state,
    }),
};

const persistConfig = {
    key: 'app',
    version: 5,
    storage: localStorage,
    migrate: createMigrate(rootMigrations),
    blacklist: ['scrollSave', 'signInForm', 'signUpForm'],
    whitelist: [
        'user',
        'toDoList',
    ],
};

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
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
        }),
    });
    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
