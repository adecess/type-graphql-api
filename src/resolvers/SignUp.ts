import { Resolver, Mutation, Arg } from "type-graphql";
import { AuthPayload } from "../entity/AuthPayload";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { APP_SECRET } from "../utils";

@Resolver()
export class SignUpResolver {
  @Mutation(() => AuthPayload)
  async signup(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthPayload | undefined> {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      }).save();

      const token = sign({ userId: user.id }, APP_SECRET);

      return { token, user };
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
