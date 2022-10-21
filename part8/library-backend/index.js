import { createServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import typeDefs from "./typedefs.js";
import resolvers from "./resolvers.js";
import User from "./models/User.js";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = "VeryPublicKey";
const PORT = 4000;

console.log("Connecting to database!");
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Successful connection!"))
  .catch((err) => console.log("Error: ", err.message));

const startup = async () => {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req.headers.authorization;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  httpServer.listen(PORT, () => console.log(`Server ready at PORT ${PORT}`));
};

startup();
