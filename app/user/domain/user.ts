interface IUser {
  id: string;
  phoneNumber: string;
}

export class User implements IUser {
  id!: string;

  phoneNumber!: string;

  static create(data: IUser): User {
    const user = new User();
    user.id = data.id;
    user.phoneNumber = data.phoneNumber;
    return user;
  }
}
