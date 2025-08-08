import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useNavigate} from 'react-router'
import { userApi } from "../api";
import {IUser} from "@/entities/user/model/types.ts";

const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
} as const

const useAuth = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const login = useMutation({
        mutationFn: (body: IUser) => userApi.login(body),
        onSuccess(data, variables, context) {
          queryClient.setQueryData(authKeys.profile(), data);
          console.log('data', data);
        },
    });

    const register = useMutation({
        mutationFn: (body: IUser) => userApi.register(body),
        onSuccess(data, variables, context) {
          queryClient.setQueryData(authKeys.profile(), data);
          console.log('data', data);
        },
    });

    return {
      login: login,
      register: register,
    }
}

export default useAuth