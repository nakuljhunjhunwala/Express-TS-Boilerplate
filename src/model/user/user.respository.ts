import User, { IUser } from './user.model.js';

class UserModelRepository {
  // Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  // Find user by ID
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).select('-password').exec();
  }

  // Create a new user
  async createUser(user: Partial<IUser>): Promise<IUser> {
    const newUser = new User(user);
    return newUser.save();
  }

  async compareUserByPassword(email: string, password: string): Promise<IUser> {
    try {
      const user = await this.findByEmail(email);
      const isValid = await user?.comparePassword(password);
      if (isValid) {
        return user!;
      }
      throw {
        status: 401,
        message: "Password doesn't match",
      };
    } catch (error) {
      throw error;
    }
  }
}

export { UserModelRepository };
