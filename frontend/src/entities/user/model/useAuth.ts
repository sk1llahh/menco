import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from 'react-router'
import {userApi} from "../api";
import {IUser} from "@/entities/user/model/types.ts";
import {useSession} from "@/shared/model/session.ts";
import {ROUTES} from "@/shared/model/routes.ts";
import {authKeys} from "@/entities/user/model/const.ts";


const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const {login: setToken} = useSession()

  const login = useMutation({
    mutationFn: (body: IUser) => userApi.login(body),
    mutationKey: authKeys.profile(),
    onSuccess: (data, variables, context) => {
      setToken(data?.data.token)
      navigate(ROUTES.HOME)
    }
  });

  const register = useMutation({
    mutationFn: (body: IUser) => userApi.register(body),
    mutationKey: authKeys.profile()
  });

  return {
    login: login,
    register: register,
  }
}

export default useAuth