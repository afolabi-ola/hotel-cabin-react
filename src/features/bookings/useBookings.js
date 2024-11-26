import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get('status');

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { isLoading, bookings, error };
}
