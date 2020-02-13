import {createAction, props} from '@ngrx/store';
import {User} from '../shared/components/user/user.model';

export const updateUser = createAction('[Authentification] updateUser', props<{user: User}>());
export const login = createAction('[Authentification] login', props<{token: string}>());
export const logout = createAction('[Authentification] logout');
