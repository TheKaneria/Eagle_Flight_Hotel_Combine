import {
  CANCELLATION_DETAILS_BEGIN,
  CANCELLATION_DETAILS_ERROR,
  CANCELLATION_DETAILS_SUCCESS,
  CONFIRM_CANCELLATION_BEGIN,
  CONFIRM_CANCELLATION_ERROR,
  CONFIRM_CANCELLATION_SUCCESS,
  CONFIRM_PARTIAL_CANCELLATION_BEGIN,
  CONFIRM_PARTIAL_CANCELLATION_ERROR,
  CONFIRM_PARTIAL_CANCELLATION_SUCCESS,
  FROM_CITY,
  GET_AMENITIES_BEGIN,
  GET_AMENITIES_ERROR,
  GET_AMENITIES_SUCCESS,
  GET_BOOK_SEAT_BEGIN,
  GET_BOOK_SEAT_DETAILS_BEGIN,
  GET_BOOK_SEAT_DETAILS_ERROR,
  GET_BOOK_SEAT_DETAILS_SUCCESS,
  GET_BOOK_SEAT_ERROR,
  GET_BOOK_SEAT_SUCCESS,
  GET_CANCELLATION_POLICY_BEGIN,
  GET_CANCELLATION_POLICY_ERROR,
  GET_CANCELLATION_POLICY_SUCCESS,
  GET_CITY_PAIR_BEGIN,
  GET_CITY_PAIR_ERROR,
  GET_CITY_PAIR_SUCCESS,
  GET_DESTINATION_BEGIN,
  GET_DESTINATION_ERROR,
  GET_DESTINATION_SUCCESS,
  GET_FETCH_TICKET_PRINT_DATA_BEGIN,
  GET_FETCH_TICKET_PRINT_DATA_ERROR,
  GET_FETCH_TICKET_PRINT_DATA_SUCCESS,
  GET_ROUTE_MIDDLE_CITY_SEQUENCE_BEGIN,
  GET_ROUTE_MIDDLE_CITY_SEQUENCE_ERROR,
  GET_ROUTE_MIDDLE_CITY_SEQUENCE_SUCCESS,
  GET_ROUTES_BEGIN,
  GET_ROUTES_ERROR,
  GET_ROUTES_SUCCESS,
  GET_SEAT_ARRANGEMENT_DETAILS_BEGIN,
  GET_SEAT_ARRANGEMENT_DETAILS_ERROR,
  GET_SEAT_ARRANGEMENT_DETAILS_SUCCESS,
  GET_SOURCE_BEGIN,
  GET_SOURCE_ERROR,
  GET_SOURCE_SUCCESS,
  GET_TICKET_BOOKING_DATA_BEGIN,
  GET_TICKET_BOOKING_DATA_ERROR,
  GET_TICKET_BOOKING_DATA_SUCCESS,
  GET_TICKET_STATUS_BEGIN,
  GET_TICKET_STATUS_ERROR,
  GET_TICKET_STATUS_SUCCESS,
  JOURNEYDATEWISE_CANCELLATION_POLICY_BEGIN,
  JOURNEYDATEWISE_CANCELLATION_POLICY_ERROR,
  JOURNEYDATEWISE_CANCELLATION_POLICY_SUCCESS,
  PARTIAL_CANCELLATION_DETAILS_BEGIN,
  PARTIAL_CANCELLATION_DETAILS_ERROR,
  PARTIAL_CANCELLATION_DETAILS_SUCCESS,
  ROUTEWISE_CANCELLATION_POLICY_BEGIN,
  ROUTEWISE_CANCELLATION_POLICY_ERROR,
  ROUTEWISE_CANCELLATION_POLICY_SUCCESS,
  SELECTED_TAB,
  TO_CITY,
  GET_CURRENT_ACCOUNT_BALANCE_BEGIN,
  GET_CURRENT_ACCOUNT_BALANCE_SUCCESS,
  GET_CURRENT_ACCOUNT_BALANCE_ERROR,
} from "../Actions";

const bus_reducer = (state, action) => {
  if (action.type === GET_SOURCE_BEGIN) {
    return { ...state, source_loading: true };
  }
  if (action.type === GET_SOURCE_SUCCESS) {
    return { ...state, source_loading: false, source_data: action.payload };
  }
  if (action.type === GET_SOURCE_ERROR) {
    return { ...state, source_loading: false };
  }
  if (action.type === GET_DESTINATION_BEGIN) {
    return { ...state, destination_loading: true };
  }
  if (action.type === GET_DESTINATION_SUCCESS) {
    return {
      ...state,
      destination_loading: false,
      destination_data: action.payload,
    };
  }
  if (action.type === GET_DESTINATION_ERROR) {
    return { ...state, destination_loading: false };
  }

  if (action.type === GET_ROUTES_BEGIN) {
    return { ...state, route_loading: true };
  }

  if (action.type === GET_ROUTES_SUCCESS) {
    return { ...state, route_loading: false, route_data: action.payload };
  }
  if (action.type === GET_ROUTES_ERROR) {
    return { ...state, route_loading: false };
  }

  if (action.type === GET_AMENITIES_BEGIN) {
    return { ...state, amenities_loading: true };
  }

  if (action.type === GET_AMENITIES_SUCCESS) {
    return {
      ...state,
      amenities_loading: false,
      amenities_data: action.payload,
    };
  }
  if (action.type === GET_AMENITIES_ERROR) {
    return { ...state, amenities_loading: false };
  }
  if (action.type === GET_CURRENT_ACCOUNT_BALANCE_BEGIN) {
    return { ...state, currentaccountbalanceloading: true };
  }
  if (action.type === GET_CURRENT_ACCOUNT_BALANCE_SUCCESS) {
    return {
      ...state,
      currentaccountbalanceloading: false,
      currentaccountbalance: action.payload,
    };
  }

  if (action.type === GET_CURRENT_ACCOUNT_BALANCE_ERROR) {
    return { ...state, currentaccountbalanceloading: false };
  }

  if (action.type === GET_CITY_PAIR_BEGIN) {
    return { ...state, citypair_loading: true };
  }

  if (action.type === GET_CITY_PAIR_SUCCESS) {
    return { ...state, citypair_loading: false, citypair_data: action.payload };
  }
  if (action.type === GET_CITY_PAIR_ERROR) {
    return { ...state, citypair_loading: false };
  }
  if (action.type === GET_SEAT_ARRANGEMENT_DETAILS_BEGIN) {
    return { ...state, seats_loading: true };
  }

  if (action.type === GET_SEAT_ARRANGEMENT_DETAILS_SUCCESS) {
    return { ...state, seats_loading: false, seats_data: action.payload };
  }
  if (action.type === GET_SEAT_ARRANGEMENT_DETAILS_ERROR) {
    return { ...state, seats_loading: false };
  }
  if (action.type === GET_BOOK_SEAT_BEGIN) {
    return { ...state, book_seat_data_loading: true };
  }

  if (action.type === GET_BOOK_SEAT_SUCCESS) {
    return {
      ...state,
      book_seat_data_loading: false,
      book_seat_data: action.payload,
    };
  }
  if (action.type === GET_BOOK_SEAT_ERROR) {
    return { ...state, book_seat_data_loading: false };
  }
  if (action.type === GET_BOOK_SEAT_DETAILS_BEGIN) {
    return { ...state, book_seat_details_data_loading: true };
  }

  if (action.type === GET_BOOK_SEAT_DETAILS_SUCCESS) {
    return {
      ...state,
      book_seat_details_data_loading: false,
      book_seat_details_data: action.payload,
    };
  }
  if (action.type === GET_BOOK_SEAT_DETAILS_ERROR) {
    return { ...state, book_seat_details_data_loading: false };
  }
  if (action.type === GET_FETCH_TICKET_PRINT_DATA_BEGIN) {
    return { ...state, fetch_ticket_print_loading: true };
  }

  if (action.type === GET_FETCH_TICKET_PRINT_DATA_SUCCESS) {
    return {
      ...state,
      fetch_ticket_print_loading: false,
      fetch_ticket_print_data: action.payload,
    };
  }
  if (action.type === GET_FETCH_TICKET_PRINT_DATA_ERROR) {
    return { ...state, fetch_ticket_print_loading: false };
  }

  if (action.type === GET_TICKET_STATUS_BEGIN) {
    return { ...state, ticket_status_loading: true };
  }

  if (action.type === GET_TICKET_STATUS_SUCCESS) {
    return {
      ...state,
      ticket_status_loading: false,
      ticket_status: action.payload,
    };
  }
  if (action.type === GET_TICKET_STATUS_ERROR) {
    return { ...state, ticket_status_loading: false };
  }

  if (action.type === GET_TICKET_BOOKING_DATA_BEGIN) {
    return { ...state, booking_data_loading: true };
  }

  if (action.type === GET_TICKET_BOOKING_DATA_SUCCESS) {
    return {
      ...state,
      booking_data_loading: false,
      booking_data: action.payload,
    };
  }
  if (action.type === GET_TICKET_BOOKING_DATA_ERROR) {
    return { ...state, booking_data_loading: false };
  }

  if (action.type === FROM_CITY) {
    return { ...state, from_city: action.payload };
  }
  if (action.type === TO_CITY) {
    return { ...state, to_city: action.payload };
  }

  if (action.type === SELECTED_TAB) {
    return { ...state, selectedTab: action.payload };
  }

  //cancellation bus tikit

  if (action.type === GET_CANCELLATION_POLICY_BEGIN) {
    return { ...state, get_cancellation_policy_loading: true };
  }
  if (action.type === GET_CANCELLATION_POLICY_SUCCESS) {
    return {
      ...state,
      get_cancellation_policy_loading: false,
      get_cancellation_policy: action.payload,
    };
  }
  if (action.type === GET_CANCELLATION_POLICY_ERROR) {
    return { ...state, get_cancellation_policy_loading: false };
  }
  if (action.type === JOURNEYDATEWISE_CANCELLATION_POLICY_BEGIN) {
    return { ...state, journey_datewise_cancellation_policy_loading: true };
  }
  if (action.type === JOURNEYDATEWISE_CANCELLATION_POLICY_SUCCESS) {
    return {
      ...state,
      journey_datewise_cancellation_policy_loading: false,
      journey_datewise_cancellation_policy: action.payload,
    };
  }
  if (action.type === JOURNEYDATEWISE_CANCELLATION_POLICY_ERROR) {
    return { ...state, journey_datewise_cancellation_policy_loading: false };
  }
  if (action.type === ROUTEWISE_CANCELLATION_POLICY_BEGIN) {
    return { ...state, routewise_cancellation_policy_loading: true };
  }
  if (action.type === ROUTEWISE_CANCELLATION_POLICY_SUCCESS) {
    return {
      ...state,
      routewise_cancellation_policy_loading: false,
      routewie_cancellation_policy: action.payload,
    };
  }
  if (action.type === ROUTEWISE_CANCELLATION_POLICY_ERROR) {
    return { ...state, routewise_cancellation_policy_loading: false };
  }
  if (action.type === CANCELLATION_DETAILS_BEGIN) {
    return { ...state, cancellation_details_loading: true };
  }
  if (action.type === CANCELLATION_DETAILS_SUCCESS) {
    return {
      ...state,
      cancellation_details_loading: false,
      cancellation_details: action.payload,
    };
  }
  if (action.type === CANCELLATION_DETAILS_ERROR) {
    return { ...state, cancellation_details_loading: false };
  }
  if (action.type === CONFIRM_CANCELLATION_BEGIN) {
    return { ...state, confirm_cancellation_loading: true };
  }
  if (action.type === CONFIRM_CANCELLATION_SUCCESS) {
    return {
      ...state,
      confirm_cancellation_loading: false,
      confirm_cancellation: action.payload,
    };
  }
  if (action.type === CONFIRM_CANCELLATION_ERROR) {
    return { ...state, confirm_cancellation_loading: false };
  }
  if (action.type === PARTIAL_CANCELLATION_DETAILS_BEGIN) {
    return { ...state, partial_cancellation_details_loading: true };
  }
  if (action.type === PARTIAL_CANCELLATION_DETAILS_SUCCESS) {
    return {
      ...state,
      partial_cancellation_details_loading: false,
      partial_cancellation_details: action.payload,
    };
  }
  if (action.type === PARTIAL_CANCELLATION_DETAILS_ERROR) {
    return { ...state, partial_cancellation_details_loading: false };
  }
  if (action.type === CONFIRM_PARTIAL_CANCELLATION_BEGIN) {
    return { ...state, confirm_partial_cancellation_loading: true };
  }
  if (action.type === CONFIRM_PARTIAL_CANCELLATION_SUCCESS) {
    return {
      ...state,
      confirm_partial_cancellation_loading: false,
      confirm_partial_cancellation: action.payload,
    };
  }
  if (action.type === CONFIRM_PARTIAL_CANCELLATION_ERROR) {
    return {
      ...state,
      confirm_partial_cancellation_loading: false,
    };
  }
  if (action.type === GET_ROUTE_MIDDLE_CITY_SEQUENCE_BEGIN) {
    return { ...state, route_middle_city_sequence_loading: true };
  }
  if (action.type === GET_ROUTE_MIDDLE_CITY_SEQUENCE_SUCCESS) {
    return {
      ...state,
      route_middle_city_sequence_loading: false,
      route_middle_city_sequence: action.payload,
    };
  }
  if (action.type === GET_ROUTE_MIDDLE_CITY_SEQUENCE_ERROR) {
    return { ...state, route_middle_city_sequence_loading: false };
  } else {
    return { ...state };
  }
};

export default bus_reducer;
