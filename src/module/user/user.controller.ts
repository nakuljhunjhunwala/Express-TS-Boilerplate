import { WrappedRequest } from '@utils/wrapper.util.js';
import { UserService } from './user.service.js';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async me({ user }: WrappedRequest) {
    try {
      const result = await this.userService.me(user.userId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
