import { gql } from "apollo-server-express"; //will create a schema
import { makeExecutableSchema } from "@graphql-tools/schema";
import userResolver from "../resolvers/userResolver"
import { merge } from "lodash";

const typeDefs = gql`
  type User {
    _id: String!,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    age: Int
  }
  type Query{ 
    getAllUsers: [User],
    getUser(id: String): User
  }

  input UserProps {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    age: Int
  }

  input UserUpdateProps {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    age: Int
  }

  type Mutation {
    #the addPerson commmand will accept an argument of type String.
    #it will return a 'Person' instance. 
    registerUser(data: UserProps): User,
    updateUser(id: String,data: UserUpdateProps): User
    deleteUser(id: String): User
  }
  `;

// export const resolvers = merge(userResolver);

// export const executableSchema = makeExecutableSchema({
//   resolvers: { ...resolvers },
//   typeDefs
// });

export default typeDefs;
