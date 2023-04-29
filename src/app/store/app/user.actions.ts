import { User } from '@shared/models/user/user';

export class GetUser {
  static readonly type = '[User] Get User';
}

export class SetUser {
  static readonly type = '[User] Set User';
  constructor(public payload: { user: User }) {}
}