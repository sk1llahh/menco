import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from 'react-router'
import {userApi} from "../api";
import {IUser} from "@/entities/user/model/types.ts";
import {useSession} from "@/shared/model/session.ts";

const authKeys = {
  all: ['auth'],
  profile: () => [...authKeys.all, 'profile'],
} as const

const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const {login: setToken} = useSession()

  const login = useMutation({
    mutationFn: (body: IUser) => userApi.login(body),
    mutationKey: [authKeys.profile()],
    onSettled: (data, error, variables, context) => {
      setToken(data?.data.token)
    }
  });

  const register = useMutation({
    mutationFn: (body: IUser) => userApi.register(body),
    mutationKey: [authKeys.profile()]
  });

  const getProfile = useQuery({
    queryFn: () => userApi.getProfile(),
    queryKey: [authKeys.profile()]
  })

  return {
    login: login,
    register: register,
    getProfile: getProfile
  }
}

export default useAuth