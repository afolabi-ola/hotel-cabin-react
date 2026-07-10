import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Select from './Select';

const StyledSortBy = styled(Select)`
  @media (max-width: 47.99em) {
    width: 100%;
  }
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSortBy
      options={options}
      type='white'
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
