import { Resolver, Query } from "type-graphql";

@Resolver()
export class InfoResolver {
  @Query(() => String)
  info() {
    return "This is the API of a Hackernews Clone";
  }
}
