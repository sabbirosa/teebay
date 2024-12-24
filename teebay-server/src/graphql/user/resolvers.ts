import UserService, {
  LoginUserPayload,
  RegisterUserPayload,
} from "../../services/user.service";

const queries = {
  loginUser: async (_: any, payload: LoginUserPayload) => {
    const token = await UserService.loginUser(payload);

    return token;
  },
};

const mutations = {
  registerUser: async (_: any, payload: RegisterUserPayload) => {
    const res = await UserService.registerUser(payload);

    return res.id;
  },
};

export const resolvers = {
  queries,
  mutations,
};
