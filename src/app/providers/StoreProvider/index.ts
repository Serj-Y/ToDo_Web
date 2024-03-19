import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from '../../providers/StoreProvider/config/store';
import type {
    StateSchema, ReduxStoreWithManager, ThunkConfig,
} from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager, ThunkConfig,
}; export type { AppDispatch };
