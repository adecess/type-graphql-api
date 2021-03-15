import { AuthChecker } from "type-graphql";
import { MyContext } from "src/types/MyContext";
import { APP_SECRET } from "../utils";
import * as jwt from "jsonwebtoken";

export const authChecker: AuthChecker<MyContext> = ({ context }) => {
  const authorization = context.req.headers.authorization;

  if (!authorization) {
    console.log("No token provided");
    return false;
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, APP_SECRET);
    context.payload = payload as any;

    console.log("Authenticated user");
    return true;
  } catch (err) {
    console.log("Access denied - Not authorized");
    return false;
  }
};
