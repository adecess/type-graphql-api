import { Resolver, Query, Authorized } from "type-graphql";
import { Link } from "../entity/Link";

@Resolver()
export class FeedResolver {
  @Authorized()
  @Query(() => [Link])
  async feed(): Promise<Link[]> {
    const links = await Link.find();
    return links;
  }
}
