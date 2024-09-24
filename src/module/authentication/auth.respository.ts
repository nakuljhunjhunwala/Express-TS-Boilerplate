import { IToken } from '@model/token/token.model.js';
import { TokenModelRespository } from '@model/token/token.respository.js';
import { IUser } from '@model/user/user.model.js';
import { UserModelRepository } from '@model/user/user.respository.js';

export class AuthRepository {
  private userRespository: UserModelRepository;
  private tokenRespository: TokenModelRespository;

  constructor() {
    this.userRespository = new UserModelRepository();
    this.tokenRespository = new TokenModelRespository();
  }

  async createUser(user: Partial<IUser>): Promise<IUser> {
    return this.userRespository.createUser(user);
  }

  async comparePassword(email: string, password: string): Promise<IUser> {
    try {
      const result = await this.userRespository.compareUserByPassword(
        email,
        password,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async addToken(data: Partial<IToken>) {
    try {
      const result = await this.tokenRespository.addToken(data);
      return result;
    } catch (error) {
      throw {
        status: 500,
        message: 'Failed to add token to database',
      };
    }
  }

  async getToken(userId: string, deviceId: string, token: string) {
    try {
      const result = await this.tokenRespository.getToken(
        userId,
        deviceId,
        token,
      );
      return result;
    } catch (error) {
      throw {
        status: 500,
        message: 'Failed to get token from database',
      };
    }
  }

  async updateToken(id: String, data: Partial<IToken>) {
    try {
      const result = await this.tokenRespository.updateTokenBasedOnId(id, data);
      return result;
    } catch (error) {
      logger.error('Failed to set new data in mongo', error);
      return null;
    }
  }

  async revoke(userId: string, deviceId: string) {
    try {
      const result = await this.tokenRespository.revokeTokenBasedOnDeviceId(
        userId,
        deviceId,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async revokeAll(userId: string) {
    try {
      const result = await this.tokenRespository.revokeAllToken(userId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
