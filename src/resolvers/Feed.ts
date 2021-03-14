import { Resolver, Query } from "type-graphql";
import { Link } from "../entity/Link";

@Resolver()
export class FeedResolver {
  @Query(() => [Link])
  async feed(): Promise<Link[] | []> {
    const links = Link.find();
    return links;
  }
}
