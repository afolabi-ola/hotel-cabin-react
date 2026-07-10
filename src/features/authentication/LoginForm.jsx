import { useState } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import styled from 'styled-components';
import Button from '../../ui/Button';
import ButtonIcon from '../../ui/ButtonIcon';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';

const PasswordField = styled.div`
  position: relative;
  width: 100%;

  & input {
    width: 100%;
    padding-right: 4.8rem;
  }
`;

const TogglePasswordButton = styled(ButtonIcon)`
  position: absolute;
  right: 0.4rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.4rem;
`;

const LoginCard = styled(Form)`
  width: 100%;
  padding: 2.4rem 1.6rem;

  @media (min-width: 48em) {
    padding: 2.4rem 4rem;
  }
`;

const LoginInput = styled(Input)`
  width: 100%;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }

  return (
    <LoginCard onSubmit={handleSubmit}>
      <FormRowVertical label='Email address'>
        <LoginInput
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label='Password'>
        <PasswordField>
          <LoginInput
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <TogglePasswordButton
            type='button'
            onClick={() => setShowPassword((show) => !show)}
            disabled={isLoading}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <HiEyeSlash /> : <HiEye />}
          </TogglePasswordButton>
        </PasswordField>
      </FormRowVertical>
      <FormRowVertical>
        <LoginButton size='large' disabled={isLoading}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </LoginButton>
      </FormRowVertical>
    </LoginCard>
  );
}

export default LoginForm;
