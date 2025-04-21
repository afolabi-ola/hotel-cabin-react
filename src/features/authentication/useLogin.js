import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin(customRedirectTo) {
  const queryClient = useQueryClient(); // Import the useQueryClient hook from '@tanstack/react-query'
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo =
    customRedirectTo || searchParams.get('redirectTo') || '/dashboard';

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate(redirectTo, { replace: true });
    },
    onError: (err) => {
      console.log('Error:', err);
      toast.error('Provided email or password is incorrect');
    },
  });

  return { login, isLoading };
}
