import styled from 'styled-components';
import { HiOutlineXMark } from 'react-icons/hi2';


import Logo from './Logo';
import MainNav from './MainNav';
import Uploader from '../data/Uploader';
import { useUser } from '../features/authentication/useUser';
import ButtonIcon from './ButtonIcon';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: fixed;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 26rem;
  transition: transform 0.3s ease;

  @media (max-width: 63.99em) {
    transform: translateX(${(props) => (props.$isOpen ? '0' : '-100%')});
    box-shadow: var(--shadow-lg);
    width: 26rem;
    max-width: calc(100vw - 3.2rem);
  }

  @media (min-width: 64em) {
    grid-area: sidebar;
    transform: translateX(0);
  }
`;

const CloseSidebarButton = styled(ButtonIcon)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  @media (min-width: 64em) {
    display: none;
  }
`;

function SideBar({ isOpen, onCloseSidebar }) {
  const {
    user: { isDemo },
  } = useUser();
  return (
    <StyledSidebar $isOpen={isOpen}>
      <CloseSidebarButton onClick={onCloseSidebar} aria-label='Close sidebar'>
        <HiOutlineXMark />
      </CloseSidebarButton>
      <Logo />
      <MainNav onNavigate={onCloseSidebar} />
      {!isDemo && <Uploader />}
    </StyledSidebar>
  );
}

export default SideBar;
