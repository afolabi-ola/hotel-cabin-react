import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
  width: 100%;
  min-width: 0;

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  grid-area: header;

  @media (min-width: 48em) {
    padding: 1.2rem 2.4rem;
  }

  @media (min-width: 64em) {
    padding: 1.2rem 4.8rem;
  }
`;

function Header({ onToggleSidebar, isSidebarOpen }) {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu
        onToggleSidebar={onToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
    </StyledHeader>
  );
}

export default Header;
