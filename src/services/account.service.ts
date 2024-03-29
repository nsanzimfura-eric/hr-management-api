import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { generateToken } from "../helpers/jwt_tokens.helper";
import transformUserToDTO from "../helpers/transformUserToDTO.helper";
import { UserDTO } from "../DTOs/user.dto";
import { hashString, verifyStringHash } from "../helpers/functions.helpers";

class AccountService {
  private UserRepository: any;

  constructor() {
    this.UserRepository = AppDataSource.getRepository(User);
  }

  // CREATE USER
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const hashedPassword = hashString(password);
    try {
      const newUser = await this.UserRepository.save({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  // LOGIN USER
  async login(user: UserDTO, password: string): Promise<any> {
    try {
      const passwordMatch = await verifyStringHash(password, user.password);
      if (!passwordMatch) {
        return false;
      }
      return generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  // FIND USER BY EMAIL
  async findUserByEmail(email: string): Promise<UserDTO | null> {
    try {
      const user = await this.UserRepository.findOneBy({ email });

      if (!user) {
        return null;
      }
      return transformUserToDTO(user);
    } catch (error) {
      return error;
    }
  }

  // FIND USER BY ID
  async findUserById(id: string): Promise<UserDTO | null> {
    try {
      const user = await this.UserRepository.findOneBy({
        id,
      });
      if (!user) return null;

      return transformUserToDTO(user);
    } catch (error) {
      throw error;
    }
  }
}

export default AccountService;
