import { Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { Link } from "../entity/Link";

@Resolver()
export class PostResolver {
  @Authorized()
  @Mutation(() => Link)
  async post(
    @Arg("url") url: string,
    @Arg("description") description: string
  ): Promise<Link> {
    const link = await Link.create({
      url,
      description,
    }).save();
    return link;
  }
}
