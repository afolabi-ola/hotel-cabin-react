import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient(); // Import the useQueryClient hook from '@tanstack/react-query'
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('Error:', err);
      toast.error('Provided email or password is incorrect');
    },
  });

  return { login, isLoading };
}
