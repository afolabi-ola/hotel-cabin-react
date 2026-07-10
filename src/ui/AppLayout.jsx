import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import styled from 'styled-components';

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2.4rem 1.6rem 4.8rem;
  grid-area: main;
  width: 100%;
  min-width: 0;

  @media (min-width: 48em) {
    padding: 4rem 4.8rem 6.4rem;
  }
`;

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  @media (min-width: 64em) {
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'sidebar header'
      'sidebar main';
  }
`;

const Backdrop = styled.button`
  border: none;
  background: rgba(17, 24, 39, 0.45);
  position: fixed;
  inset: 0;
  z-index: 90;

  @media (min-width: 64em) {
    display: none;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow: hidden;

  @media (min-width: 48em) {
    gap: 3.2rem;
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((isOpen) => !isOpen);
  }

  return (
    <StyledAppLayout>
      {isSidebarOpen && (
        <Backdrop
          onClick={() => setIsSidebarOpen(false)}
          aria-label='Close menu'
        />
      )}
      <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <SideBar
        isOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
