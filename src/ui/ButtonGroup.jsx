import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;

  @media (max-width: 47.99em) {
    flex-direction: column;
    justify-content: stretch;

    & button,
    & a {
      width: 100%;
    }
  }
`;

export default ButtonGroup;
