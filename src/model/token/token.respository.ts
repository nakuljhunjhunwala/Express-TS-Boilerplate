import { Token, IToken } from './token.model.js';

export class TokenModelRespository {
  constructor() {}

  async getToken(userId: string, deviceId: string, refreshToken: string) {
    return await Token.findOne({
      userId: userId,
      deviceId: deviceId,
      token: refreshToken,
      valid: true,
    });
  }

  async addToken(data: Partial<IToken>) {
    return await new Token(data).save();
  }

  async revokeAllToken(userId: string) {
    return await Token.updateMany({ userId, valid: true }, { valid: false });
  }

  async revokeTokenBasedOnDeviceId(userId: string, deviceId: string) {
    return await Token.updateMany(
      { userId: userId, deviceId: deviceId, valid: true },
      { valid: false },
    );
  }

  async updateTokenBasedOnId(id: String, data: Partial<IToken>) {
    return await Token.updateOne({ _id: id }, data);
  }
}
