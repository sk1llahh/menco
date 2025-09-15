import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authApi } from '@/entities/auth/api';
import { sessionManager } from '@/shared/model/session';
import { ROUTES } from '@/shared/model/routes';

type Props = {
  className?: string;
};

export const LogoutButton = ({ className }: Props) => {
  const navigate = useNavigate();
  const logout = useMutation({
    mutationFn: () => authApi.logout({ refreshToken: sessionManager.refreshToken || '' }),
    onSettled: () => {
      sessionManager.logout();
      navigate(ROUTES.LOGIN);
    },
  });

  return (
    <button
      type="button"
      className={`btn btn-sm ${className ?? ''}`}
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
    >
      {logout.isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
