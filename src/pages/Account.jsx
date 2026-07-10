import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import { useUser } from '../features/authentication/useUser';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import styled from 'styled-components';

const DemoNotice = styled.div`
  border-radius: 1.6rem;
  border: 1px solid var(--color-yellow-700);
  border-left-width: 0.6rem;
  background-color: var(--color-yellow-100);
  padding: 1.6rem 2rem;
  margin: 1.6rem 0 2.4rem;
  box-shadow: var(--shadow-sm);

  strong {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    color: var(--color-yellow-700);
  }

  p {
    margin: 0;
    color: var(--color-grey-700);
    line-height: 1.6;
  }

  p + p {
    margin-top: 1rem;
  }
`;

function Account() {

const {
  user: { isDemo },
} = useUser();

  return (
    <>
      <Heading as='h1'>Update your account</Heading>

      {isDemo && (
        <DemoNotice>
          <strong>Demo Account</strong>
          <p>
            You're using a public demonstration account. Profile editing,
            password changes, and avatar updates are disabled to keep the demo
            experience consistent for all visitors.
          </p>
          <p>
            You can still explore the rest of the application, including cabins,
            bookings, guests, and dashboard features.
          </p>
        </DemoNotice>
      )}

      <Row>
        <Heading as='h3'>Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as='h3'>Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
