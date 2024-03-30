import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { generateToken } from "../helpers/jwt_tokens.helper";
import transformUserToDTO from "../helpers/transformUserToDTO.helper";
import { UserDTO } from "../DTOs/user.dto";
import { hashString, verifyStringHash } from "../helpers/functions.helpers";
import { Repository } from "typeorm";

class AccountService {
  private UserRepository: Repository<User>;

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
    const hashedPassword = await hashString(password);
    try {
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = hashedPassword;

      const newUser = await this.UserRepository.save(user);

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
  async findUserById(id: string): Promise<User | null> {
    try {
      const user = await this.UserRepository.findOneBy({
        id,
      });
      if (!user) return null;

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default AccountService;
