export class UserDTO {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;
}
