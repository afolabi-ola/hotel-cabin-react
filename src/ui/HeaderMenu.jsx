import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser, HiOutlineBars3 } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const MenuToggle = styled(ButtonIcon)`
  @media (min-width: 64em) {
    display: none;
  }
`;

function HeaderMenu({ onToggleSidebar, isSidebarOpen }) {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <MenuToggle
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        >
          <HiOutlineBars3 />
        </MenuToggle>
      </li>
      <li>
        <ButtonIcon
          onClick={() => navigate('/account')}
          aria-label='Open account'
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
