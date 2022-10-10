import { createAction, props } from '@ngrx/store';
import User, { UserCredentials } from '../user.model';

export const loginStart = createAction(
  '[Auth] LoginStart',
  props<{ credentials: UserCredentials }>(),
);

export const signUpStart = createAction(
  '[Auth] SignUpStart',
  props<{ credentials: UserCredentials }>(),
);

export const authSuccess = createAction(
  '[Auth] AuthSuccess',
  props<{ user: User }>(),
);

export const authFail = createAction(
  '[Auth] AuthFail',
  props<{ error: string }>(),
);
