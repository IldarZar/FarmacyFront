import { User } from '@shared/models/user/user';

export class SetUser {
  static readonly type = '[User] Set User';
  constructor(public payload: { user: User }) {}
}

export class UpdateUser {
  static readonly type = '[User] Set User';
  constructor(public payload: { user: User }) {}
}
