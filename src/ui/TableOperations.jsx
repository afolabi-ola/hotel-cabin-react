import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 47.99em) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

export default TableOperations;
