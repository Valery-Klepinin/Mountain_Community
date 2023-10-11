export type UserInfo = {
  email: string;
  name: string;
};

export type User = UserInfo & {
  id: number;
  isAdmin: boolean;
};

export type RegisterUserData = UserInfo & {
  password: string;
};

export type LoginUserData = {
  name?: string;
  email: string;
  password: string;
};

export default User;
