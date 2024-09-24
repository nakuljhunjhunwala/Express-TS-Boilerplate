import { IUser } from '@model/user/user.model.js';
import { UserModelRepository } from '@model/user/user.respository.js';

export class UserRepository {
  private userRespository: UserModelRepository;

  constructor() {
    this.userRespository = new UserModelRepository();
  }

  async me(id: string): Promise<IUser> {
    try {
      const result = (await this.userRespository.findById(id)) as IUser;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
