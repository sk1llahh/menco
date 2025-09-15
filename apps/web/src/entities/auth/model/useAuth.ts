import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from '@/shared/model/routes';
import { sessionManager } from '@/shared/model/session';
import { authApi } from '../api';
import { authKeys } from './const';
import { RegisterBody, LoginBody } from '@repo/types'


const useAuth = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async (body: LoginBody) => {
      const res = await authApi.login(body);
      const access = res?.data?.data?.accessToken;
      const refresh = res?.data?.data?.refreshToken;
      if (access) sessionManager.login(access);
      if (refresh) sessionManager.refreshToken = refresh;
      return res;
    },
    mutationKey: authKeys.login(),
  });

  const register = useMutation({
    mutationFn: async (body: RegisterBody) => {
      const res = await authApi.register(body);
      const access = res?.data?.data?.accessToken;
      const refresh = res?.data?.data?.refreshToken;
      if (access) sessionManager.login(access);
      if (refresh) sessionManager.refreshToken = refresh;
      return res;
    },
    mutationKey: authKeys.register(),
  });

  return {
    login: login,
    register: register,
  };
};

export default useAuth;
