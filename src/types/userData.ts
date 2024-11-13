export type UserData = {
  id: string;
  img?: string;
  name: string;
  surname: string;
  phone?: string;
  email: string;
};

export type UpdateUser = {
  userId: string;
  newData: UserData;
};
