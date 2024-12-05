export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: string;
  role: string;
  status: string;
  isDeleted: boolean;
};

export type TCreateUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
