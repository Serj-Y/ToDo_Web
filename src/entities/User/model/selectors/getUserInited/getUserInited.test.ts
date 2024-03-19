import { getUserInited } from './getUserInited';
import { StateSchema } from '../../../../../app/providers/StoreProvider';

describe('getUserInited.test', () => {
    test('should return inited true', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _inited: true,
            },
        };
        expect(getUserInited(state as StateSchema))
            .toEqual(true);
    });
    test('should return inited false', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _inited: false,
            },
        };
        expect(getUserInited(state as StateSchema))
            .toEqual(false);
    });
});
