import styled from 'styled-components';


import Logo from './Logo';
import MainNav from './MainNav';
import Uploader from '../data/Uploader';
import { useUser } from '../features/authentication/useUser';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: fixed;
  top: 0;
  z-index: 100;
  height: 100vh;
  grid-area: 1 / 1 / span 2 / span 1;
  width: 26rem;
`;

function SideBar() {
  const {
    user: { isDemo },
  } = useUser();
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {!isDemo && <Uploader />}
    </StyledSidebar>
  );
}

export default SideBar;
