import { StateSchema } from '../../../../../app/providers/StoreProvider';

export const getSignUpEmail = (state:StateSchema) => state?.signUpForm?.email || '';
