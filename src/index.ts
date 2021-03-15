import "reflect-metadata"; // needed for both TypeORM and TypeGraphQL
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { InfoResolver } from "./resolvers/Info";
import { Link } from "./entity/Link";
import { FeedResolver } from "./resolvers/Feed";
import { PostResolver } from "./resolvers/Post";
import { User } from "./entity/User";
import { AuthPayload } from "./entity/AuthPayload";
import { UserResolver } from "./resolvers/User";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "./utils";

const main = async () => {
  // db connection
  await createConnection({
    type: "postgres",
    url: "postgresql://postgres:postgres@localhost:5432/tgraphql",
    logging: false,
    synchronize: true,
    entities: [Link, User, AuthPayload],
  });

  // app
  const app = express();

  // Apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [InfoResolver, FeedResolver, PostResolver, UserResolver],
      validate: false,
      authChecker: ({ context }) => {
        const authorization = context.req.headers.authorization;

        if (!authorization) {
          console.log("No token provided");
          return false;
        }

        try {
          const token = authorization.split(" ")[1];
          const payload = jwt.verify(token, APP_SECRET);
          context.payload = payload;

          console.log("Authenticated user");
          return true;
        } catch (err) {
          console.log("Access denied to unauthenticated user");
          return false;
        }
      },
    }),
    context: ({ req, res }) => {
      const context = {
        req,
        res,
      };
      return context;
    },
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
