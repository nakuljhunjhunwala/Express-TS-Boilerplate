import { WrappedRequest } from '@utils/wrapper.util.js';
import { AuthService } from './auth.service.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async refresh({ headers, deviceId }: WrappedRequest) {
    try {
      if (!headers.refreshtoken) {
        throw {
          status: 400,
          message: 'Refresh Token Missing',
        };
      }
      const result = await this.authService.refresh(
        headers.refreshtoken,
        deviceId,
      );
      return {
        status: 200,
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async login({ body, deviceId }: WrappedRequest) {
    try {
      const result = await this.authService.login(body, deviceId);
      return {
        status: 200,
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async createUser({ body, deviceId }: WrappedRequest) {
    try {
      const result = await this.authService.register(body, deviceId);
      return {
        status: 201,
        data: result,
        message: 'User Registered',
      };
    } catch (error) {
      throw error;
    }
  }

  async logout({ deviceId, user }: WrappedRequest) {
    try {
      await this.authService.logout(user?.userId, deviceId);
      return {
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async logAllOut({ user }: WrappedRequest) {
    try {
      await this.authService.logAlOut(user?.userId);
      return {
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }
}
