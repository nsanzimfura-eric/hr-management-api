import { User } from "../entity/user.entity";
import { AppDataSource } from "../data-source";
import { hashString } from "../helpers/functions.helpers";

export default class UserSeeder {
  static async seed() {
    try {
      const existingAdmin = await AppDataSource.manager.findOneBy(User, {
        email: process.env.EMAIL,
      });

      if (!existingAdmin) {
        const user = new User();
        const hashedUserPassword = await hashString(
          process.env.SUPER_ADMIN_PASSWORD
        );

        user.firstName = process.env.FIRST_NAME;
        user.lastName = process.env.LAST_NAME;
        user.email = process.env.EMAIL;
        user.password = hashedUserPassword;
        AppDataSource.manager.save(user);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
