import proxy from "../service/appServiceProxy";
import { UserModel } from "../db/users";

type User = {
  _id?: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string

}

type UpdateUserPayload = {
  id: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string
}

const Resolvers = {
  Query: {
    getAllUsers: async () => {
      return await UserModel.find()
    },
    getUser: async (_: any, args: any) => {
      return await UserModel.findOne({ _id: args.id })
    }
  },
  Mutation: {
    addUser: async (_: any, args: any) => {
      const newPerson: User = {
        firstname: args.data.firstname,
        lastname: args.data.lastname,
        email: args.data.email,
        password: args.data.password
      };
      // people.push(newPerson);

      let user = await UserModel.findOne({ email: newPerson.email })
      if (user) {
        return null
      }
      user = await UserModel.create(newPerson);
      newPerson._id = JSON.stringify(user._id)
      return newPerson; //return the new object's result
    },
    updateUser: async (_: any, args: any) => {
      let payload: UpdateUserPayload = args.data;
      if (!args.data.id) {
        return null
      }
      let updatepayload: User = {
        firstname: payload.firstname,
        email: payload.email,
        password: payload.password,
        lastname: payload.lastname,
      }
      await UserModel.findOneAndUpdate({ _id: args.data.id }, updatepayload)
      updatepayload._id = args.data.id;
      return updatepayload
    },
    deleteUser: async (_: any, args: any) => {
      let payload: UpdateUserPayload = args.id;
      await UserModel.findOneAndDelete({ _id: args.data.id })
      return args.id
    }
  }
};

export default Resolvers;
