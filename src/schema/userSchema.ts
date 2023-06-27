import { gql } from "apollo-server-express"; //will create a schema
const Schema = gql`
  type User {
    _id: String!,
    firstname: String,
    lastname: String,
    email: String,
    password: String
  }
  type Query{ 
    getAllUsers: [User],
    getUser(id: String): User
  }

  input UserProps {
    firstname: String,
    lastname: String,
    email: String,
    password: String
  }

  input UserUpdateProps {
    id: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
  }

  type Mutation {
    #the addPerson commmand will accept an argument of type String.
    #it will return a 'Person' instance. 
    addUser(data: UserProps): User,
    updateUser(data: UserUpdateProps): User
    deleteUser(id: String): String
  }
  `;

export default Schema;
