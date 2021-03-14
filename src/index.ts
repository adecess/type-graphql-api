import "reflect-metadata"; // needed for both TypeORM and TypeGraphQL
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { InfoResolver } from "./resolvers/Info";
import { Link } from "./entity/Link";
import { FeedResolver } from "./resolvers/Feed";

const main = async () => {
  // db connection
  const connection = await createConnection({
    type: "postgres",
    url: "postgresql://postgres:postgres@localhost:5432/tgraphql",
    logging: true,
    synchronize: true,
    entities: [Link],
  });

  // app
  const app = express();

  // Apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [InfoResolver, FeedResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
