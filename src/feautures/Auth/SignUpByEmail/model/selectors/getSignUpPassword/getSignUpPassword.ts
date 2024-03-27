import { StateSchema } from '../../../../../../app/providers/StoreProvider';

export const getSignUpPassword = (state:StateSchema) => state?.signUpForm?.password || '';
