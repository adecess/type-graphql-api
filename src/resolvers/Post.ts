import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import { ApolloError } from "apollo-server-errors";
import { Link } from "../entity/Link";
import { MyContext } from "src/types/MyContext";
import { User } from "../entity/User";

@Resolver()
export class PostResolver {
  @Authorized()
  @Mutation(() => Link)
  async post(
    @Arg("url") url: string,
    @Arg("description") description: string,
    @Ctx() ctx: MyContext
  ): Promise<Link> {
    const user = await User.findOne({ where: { id: ctx!.payload!.userId } });

    if (!user) {
      throw new ApolloError("User not found");
    }

    const link = await Link.create({
      url,
      description,
      user,
    }).save();
    return link;
  }
}
