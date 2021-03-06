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
import { authChecker } from "./auth/auth-checker";

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
      authChecker,
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
