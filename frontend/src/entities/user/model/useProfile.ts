import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { authKeys } from '@/entities/user/model/const';

import { userApi } from '../api';

const useProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getProfile = useQuery({
    queryFn: () => userApi.getMe(),
    queryKey: authKeys.profile(),
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  const getProfileList = useQuery({
    queryFn: () => userApi.getProfileList(),
    queryKey: authKeys.list(),
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  return {
    getProfile: getProfile,
    getProfileList: getProfileList,
  };
};

export default useProfile;
