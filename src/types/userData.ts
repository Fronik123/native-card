export type UserData = {
  id: string;
  img?: string;
  name: string;
  surname: string;
  phone?: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  userId: string;
  newData: UserData;
};

export type NewUserData = Omit<UserData, 'id'>;
