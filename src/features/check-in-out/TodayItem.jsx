import styled from "styled-components";
import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: auto 2rem 1fr;
  column-gap: 1rem;
  row-gap: 0.8rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (min-width: 48em) {
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
    gap: 1.2rem;
    padding: 0.8rem 0;
  }
`;

const CheckInAction = styled.div`
  grid-column: 1 / -1;

  @media (min-width: 48em) {
    grid-column: auto;
  }

  & a,
  & button {
    width: 100%;

    @media (min-width: 48em) {
      width: auto;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
  grid-column: 3;

  @media (min-width: 48em) {
    grid-column: auto;
  }
`;

const Nights = styled.div`
  grid-column: 3;
  color: var(--color-grey-500);

  @media (min-width: 48em) {
    grid-column: auto;
    color: inherit;
  }
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
      {status === 'checked-in' && <Tag type='blue'>Departing</Tag>}

      <Flag src={guests.countryFlag} alt={guests.countryFlag} />

      <Guest>{guests.fullName}</Guest>
      <Nights>{numNights} nights</Nights>

      {status === 'unconfirmed' && (
        <CheckInAction>
          <Button
            size='small'
            variation='primary'
            as={Link}
            to={`/checkin/${id}`}
          >
            Check in
          </Button>
        </CheckInAction>
      )}

      {status === 'checked-in' && (
        <CheckInAction>
          <CheckoutButton bookingId={id} />
        </CheckInAction>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
