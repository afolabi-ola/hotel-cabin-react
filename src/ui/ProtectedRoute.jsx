import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  //load autenticated user
  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading)
        navigate(
          `/login?redirectTo=${encodeURIComponent(
            location.pathname + location.search,
          )}`,
        );
    },
    [isAuthenticated, isLoading, navigate, location.pathname, location.search],
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
