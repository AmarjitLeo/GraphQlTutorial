
// const { ApolloServer, gql } = require("apollo-server-express");




// export async function connectToGraphQl(appServer) {

//     // Set up Apollo Server
//     const server = new ApolloServer({
//         typeDefs,
//         resolvers,
//         plugins: [ApolloServerPluginDrainHttpServer({ appServer })],
//     });
//     await server.start();


//     // const typeDefs = executableSchema
//     // const gl = new ApolloServer({
//     //     schema: typeDefs, 
//     //     resolvers: userResolver,
//     //     context: (req: any) => {
//     //         console.log("i req!")
//     //         return {
//     //             req: req.req,
//     //             res: req.res,
//     //         }
//     //     },
//     // });
//     // await gl.start();
//     // gl.applyMiddleware({ app });
// }



// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import bodyParser from 'body-parser';

// // The GraphQL schema
// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }
// `;

// // A map of functions which return data for the schema.
// const resolvers = {
//   Query: {
//     hello: () => 'world',
//   },
// };

// const app = express();
// const httpServer = http.createServer(app);



// app.use(
//   cors(),
//   bodyParser.json(),
//   expressMiddleware(server),
// );

// await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(`🚀 Server ready at http://localhost:4000`);