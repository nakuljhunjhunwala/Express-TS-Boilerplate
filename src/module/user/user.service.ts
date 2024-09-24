import { UserRepository } from './user.respository.js';
import { IUser } from '@model/user/user.model.js';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async me(id: string): Promise<IUser> {
    try {
      const user = await this.userRepository.me(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
