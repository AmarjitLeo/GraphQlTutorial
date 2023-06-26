
import Resolvers from "../resolvers/userResolver";
import Schema from "../schema/userSchema";
const { ApolloServer, gql } = require("apollo-server-express");

export async function connectToGraphQl(app: any) {
    const typeDefs = Schema
    const resolvers = Resolvers
    const gl = new ApolloServer({ typeDefs, resolvers });
    await gl.start();
    gl.applyMiddleware({ app });
}

