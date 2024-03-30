export class UserDTO {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;
}
