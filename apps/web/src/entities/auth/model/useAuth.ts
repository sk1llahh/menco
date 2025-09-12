import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { sessionManager } from '@/shared/model/session';
import { authApi } from '../api';
import { authKeys } from './const';
import {RegisterBody, LoginBody} from '@repo/types'


const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: (body: LoginBody) => authApi.login(body),
    mutationKey: authKeys.login(),
    onSuccess: (data, variables, context) => {
      sessionManager.login(data?.data?.data?.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  const register = useMutation({
    mutationFn: (body: RegisterBody) => authApi.register(body),
    mutationKey: authKeys.register(),
    onSuccess(data, variables, context) {
      sessionManager.login(data?.data?.data?.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  return {
    login: login,
    register: register,
  };
};

export default useAuth;
