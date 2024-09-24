import { RegisterUserDto } from './dto/register.dto.js';
import { AuthRepository } from './auth.respository.js';
import { LoginUserDto } from './dto/login.dto.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@utils/jwt.util.js';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(
    createUserDto: RegisterUserDto,
    deviceId: string,
  ): Promise<any> {
    const userDetails = await this.authRepository.createUser(createUserDto);

    const payload = {
      userId: userDetails?._id,
    };
    const token = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await this.authRepository.addToken({
      deviceId: deviceId,
      userId: payload.userId as any,
      token: refreshToken,
    });

    return {
      token: token,
      refreshToken: refreshToken,
    };
  }

  async login(loginUserDto: LoginUserDto, deviceId: string): Promise<any> {
    try {
      const { email, password } = loginUserDto;
      const userDetails = await this.authRepository.comparePassword(
        email,
        password,
      );

      const payload = {
        userId: userDetails?._id,
      };
      const token = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      await this.authRepository.addToken({
        deviceId: deviceId,
        userId: payload.userId as any,
        token: refreshToken,
      });

      return {
        token: token,
        refreshToken: refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async refresh(refreshToken: string, deviceId: string) {
    try {
      const payload = verifyRefreshToken(refreshToken) as any;
      const userId = payload.userId;

      const tokenDoc = await this.authRepository.getToken(
        userId,
        deviceId,
        refreshToken,
      );
      if (!tokenDoc)
        throw {
          status: 400,
          message: 'Invalid refresh token',
        };

      let newRefreshToken = refreshToken;

      const newToken = generateRefreshToken({ userId: userId });
      tokenDoc.token = refreshToken;
      const updatedData = await this.authRepository.updateToken(
        tokenDoc._id as string,
        tokenDoc,
      );
      if (updatedData) {
        newRefreshToken = newToken;
      }

      const newAccessToken = generateAccessToken({ userId: userId });
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      throw err;
    }
  }

  async logout(userId: string, deviceId: string) {
    try {
      const result = await this.authRepository.revoke(userId, deviceId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async logAlOut(userId: string) {
    try {
      const result = await this.authRepository.revokeAll(userId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
