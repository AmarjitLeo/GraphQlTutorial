import proxy from "../service/appServiceProxy";

const Resolvers = {
  Query: {
    getAllUsers: proxy.user.getUsers
  },
};
export default Resolvers;
