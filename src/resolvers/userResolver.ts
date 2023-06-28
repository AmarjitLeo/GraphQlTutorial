import proxy from "../service/appServiceProxy";
import { ApolloError } from "apollo-server-express";
import STATUS_CODES from "../utils/enum/statusCodes"
import { UserModel } from "../db/users";
import * as IUserService from "../service/user/IUserService"

type User = {
  _id?: String,
  firstname: String,
  lastname: String,
  email: String,
  password: string
}

type UpdateUserPayload = {
  id: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string
}

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await UserModel.find()
    },
    getUser: async (_: any, args: any) => {
      return await UserModel.findOne({ _id: args.id })
    }
  },
  Mutation: {
    async registerUser(parent: any, args: any) {
      const payload: IUserService.IRegisterUserPayload = args.data;
      let response: IUserService.IRegisterUserResponse;
      try {
        response = await proxy.user.create(payload);
        if (response.statusCode !== STATUS_CODES.OK) {
          throw new ApolloError(
            response.error?.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }
      return response.data;
    },
    updateUser: async (_: any, args: any) => {
      const payload: UpdateUserPayload = args.data;
      let response: IUserService.IUpdateUserResponse;
      try {
        let { id, ...rest } = payload
        response = await proxy.user.updateUser({ id: args.id, data: payload });
        if (response.statusCode !== STATUS_CODES.OK) {
          throw new ApolloError(
            response.error?.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }
      return response.data;
    },
    deleteUser: async (_: any, args: any) => {
      try {
        let payload: IUserService.IDeleteUserPayload = args;
        let response: IUserService.IDeleteUserResponse;
        response = await await proxy.user.deleteUser(payload);
        return response.data
      } catch (e) {
        throw e;
      }
    }
  }
};

export default resolvers;
