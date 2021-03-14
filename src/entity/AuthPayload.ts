import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType({ description: "The authPayload model" })
export class AuthPayload {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
