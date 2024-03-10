export class User {
  id!: string;

  phoneNumber!: string;

  constructor(user: User) {
    this.id = user.id;
    this.phoneNumber = user.phoneNumber;
  }
}
