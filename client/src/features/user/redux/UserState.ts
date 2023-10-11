import User from '../types/User';

export type UserState = {
  user: User | undefined;
  error: string | undefined;
};
