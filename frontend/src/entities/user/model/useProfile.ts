import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { userApi } from "../api";

import { authKeys } from "@/entities/user/model/const";

const useProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getProfile = useQuery({
    queryFn: () => userApi.getProfile(),
    queryKey: authKeys.profile(),
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  return {
    getProfile: getProfile,
  };
};

export default useProfile;
