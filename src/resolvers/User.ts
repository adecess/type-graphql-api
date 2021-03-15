import { Resolver, Mutation, Arg } from "type-graphql";
import { AuthPayload } from "../entity/AuthPayload";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils";

@Resolver()
export class UserResolver {
  @Mutation(() => AuthPayload)
  async signup(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthPayload> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ userId: user.id }, APP_SECRET, {
      expiresIn: "10m",
    });

    return { token, user };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthPayload | undefined> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET, {
      expiresIn: "10m",
    });

    return {
      token,
      user,
    };
  }
}
