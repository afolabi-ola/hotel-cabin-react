import styled from "styled-components";
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
  min-height: 100vh;
  width: 100%;
  padding: 2.4rem 1.6rem;
  background-color: var(--color-grey-50);

  display: flex;
  justify-content: center;

  @media (min-width: 48em) {
    padding: 4rem 2.4rem;
  }
`;

const LoginContent = styled.section`
  width: min(100%, 48rem);
  display: grid;
  align-content: center;
  gap: 2.4rem;

  @media (min-width: 48em) {
    gap: 3.2rem;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <LoginContent>
        <Logo />
        <Heading as='h4'>Log in to your account</Heading>
        <LoginForm />
      </LoginContent>
    </LoginLayout>
  );
}

export default Login;
