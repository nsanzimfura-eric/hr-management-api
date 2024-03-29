import { UserDTO } from "../DTOs/user.dto";
import { User } from "../entity/user.entity";

function transformUserToDTO(user: User): UserDTO {
  const userDTO = new UserDTO();
  userDTO.id = user.id;
  userDTO.firstName = user.firstName;
  userDTO.lastName = user.lastName;
  userDTO.email = user.email;
  userDTO.createdAt = user.createdAt;
  userDTO.updatedAt = user.updatedAt;
  userDTO.deletedAt = user.deletedAt || null;

  return userDTO;
}

export default transformUserToDTO;
