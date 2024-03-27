import { StateSchema } from '../../../../../../app/providers/StoreProvider';

export const getSignUpName = (state:StateSchema) => state?.signUpForm?.name || '';
