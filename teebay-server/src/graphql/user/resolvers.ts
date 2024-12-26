import UserService, {
  LoginUserPayload,
  RegisterUserPayload,
} from "../../services/user.service";

const queries = {
  getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
  },
};

const mutations = {
  registerUser: async (_: any, payload: RegisterUserPayload) => {
    const res = await UserService.registerUser(payload);

    return res.id;
  },

  loginUser: async (_: any, payload: LoginUserPayload) => {
    const token = await UserService.loginUser(payload);

    return token;
  },
};

export const resolvers = {
  queries,
  mutations,
};
