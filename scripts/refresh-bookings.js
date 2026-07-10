import supabase from './supabase-admin.js';
import { isFuture, isPast, isToday } from 'date-fns';
import { bookings } from '../src/data/data-bookings.js';
import { subtractDates } from '../src/utils/helpers.js';

async function createBookings() {
  console.log('Is running booking creation');
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { error: deleteError } = await supabase
    .from('bookings')
    .delete()
    .gt('id', 0);

  if (deleteError) {
    console.error('Failed to delete old bookings:', deleteError.message);
    process.exit(1);
  }

  const { data: guestsIds, error: guestsError } = await supabase
    .from('guests')
    .select('id')
    .order('id');

  if (guestsError || !guestsIds || guestsIds.length === 0) {
    console.error(
      'Failed to fetch guests. Ensure seed guests exist in the DB first!',
    );
    process.exit(1);
  }

  const { data: cabinsData, error: cabinsError } = await supabase
    .from('cabins')
    .select('id,regularPrice,discount')
    .order('id');

  if (cabinsError || !cabinsData || cabinsData.length === 0) {
    console.error(
      'Failed to fetch cabins. Ensure seed cabins exist in the DB first!',
    );
    process.exit(1);
  }

  const allGuestIds = guestsIds.map((guest) => guest.id);
  const allCabinIds = cabinsData.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabinsData.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out';
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from('bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

createBookings();
