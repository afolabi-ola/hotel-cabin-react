import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled(Link)`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo to='/dashboard'>
      <Img src='/logo-light.png' alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
