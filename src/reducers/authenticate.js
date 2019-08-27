import {
  FETCHING_BOOKING_SUCCESS,

} from '../constants';

const initialState = {
  booking: [],
  isFetching: false,
  dateSelected: null,
  hourSelected: null,
  laundryItems: {},
  // address: null,
  addressId: null,
  stylistsSelected: [],
  error: false,
  promoCode: null,
  freeBooking: null,
  addons: []
}
export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_BOOKING_SUCCESS:
        return {
        ...state,
        booking: [],
        isFetching: true
      };

    default:
      return state;
  }
}
