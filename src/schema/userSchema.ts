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
  }
  `;
export default Schema;
//export this Schema so we can use it in our project

// type Person {
//   id: ID!
//   name: String
// }
// #handle user commands
// type Query {


// getAllPeople: [Person] #will return multiple Person instances
// getPerson(id: Int): Person #has an argument of 'id' of type Integer.
// }