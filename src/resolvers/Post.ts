import { Resolver, Mutation, InputType, Field, Arg } from "type-graphql";
import { Link } from "../entity/Link";

@InputType()
export class PostInput {
  @Field()
  url: string;

  @Field()
  description: string;
}

@Resolver()
export class PostResolver {
  @Mutation(() => Link)
  async post(
    @Arg("input")
    { url, description }: PostInput
  ): Promise<Link> {
    const links = await Link.find();
    const link = await Link.create({
      id: `link-${links.length}`,
      url,
      description,
    });
    await link.save();
    return link;
  }
}
