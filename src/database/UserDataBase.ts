import { User } from "../model/User";

export class UserRepository {
  private users: User[];

  constructor() {
    this.users = [
      {
        id: "35b62ff4-64af-4721-a4c5-d038c6f730cf",
        name: "Rubens",
        email: "rubens@gmail.com",
        role: "ADMIN"
      },
    ];
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }

}
