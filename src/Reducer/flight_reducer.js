import {
  BOOKING_BEGIN,
  BOOKING_ERROR,
  BOOKING_SUCCESS,
  CLEAR_FLIGHT_DATA,
  CREATE_ITINERARY_BEGIN,
  CREATE_ITINERARY_ERROR,
  CREATE_ITINERARY_SUCCESS,
  FARE_RULES_BEGIN,
  FARE_RULES_ERROR,
  FARE_RULES_SUCCESS,
  FLIGHT_SEARCH_BEGIN,
  FLIGHT_SEARCH_ERROR,
  FLIGHT_SEARCH_SUCCESS,
  GET_BOOKING_BEGIN,
  GET_BOOKING_ERROR,
  GET_BOOKING_SUCCESS,
  GET_ITINERARY_BEGIN,
  GET_ITINERARY_ERROR,
  GET_ITINERARY_SUCCESS,
  REPRICE_BEGIN,
  REPRICE_ERROR,
  REPRICE_SUCCESS,
  SAVE_PASSENGER_DETAILS_BEGIN,
  SAVE_PASSENGER_DETAILS_ERROR,
  SAVE_PASSENGER_DETAILS_SUCCESS,
  WALLET_API_BEGIN,
  WALLET_API_ERROR,
  WALLET_API_SUCCESS,
} from "../Actions";

const flight_reducer = (state, action) => {
  if (action.type == FLIGHT_SEARCH_BEGIN) {
    return { ...state, flight_Loading: true };
  }
  if (action.type == FLIGHT_SEARCH_SUCCESS) {
    return {
      ...state,
      flight_Loading: false,
      flight_Data: action.payload?.outboundFlights
        ? action.payload?.outboundFlights
        : [],
      return_flight_data: action.payload?.inboundFlights
        ? action.payload?.inboundFlights
        : [],
    };
  }
  if (action.type == FLIGHT_SEARCH_ERROR) {
    return { ...state, flight_Loading: false };
  }

  if (action.type == FARE_RULES_BEGIN) {
    return { ...state, fare_rules_Loading: true };
  }
  if (action.type == FARE_RULES_SUCCESS) {
    return {
      ...state,
      fare_rules_Loading: false,
      fare_rules: action.payload ? action.payload : [],
    };
  }
  if (action.type == FARE_RULES_ERROR) {
    return { ...state, fare_rules_Loading: false };
  }

  if (action.type == CREATE_ITINERARY_BEGIN) {
    return { ...state, itinerary_loading: true };
  }
  if (action.type == CREATE_ITINERARY_SUCCESS) {
    return {
      ...state,
      itinerary_loading: false,
      itinerary_data: action.payload,
    };
  }
  if (action.type == CREATE_ITINERARY_ERROR) {
    return { ...state, itinerary_loading: false };
  }

  if (action.type == GET_ITINERARY_BEGIN) {
    return { ...state, getitinerary_loading: true };
  }
  if (action.type == GET_ITINERARY_SUCCESS) {
    return {
      ...state,
      getitinerary_loading: false,
      getitinerary_data: action.payload ? action.payload : {},
    };
  }
  if (action.type == GET_ITINERARY_ERROR) {
    return { ...state, getitinerary_loading: false };
  }

  if (action.type == SAVE_PASSENGER_DETAILS_BEGIN) {
    return { ...state, passenger_loading: true };
  }
  if (action.type == SAVE_PASSENGER_DETAILS_SUCCESS) {
    return { ...state, passenger_loading: false };
  }
  if (action.type == SAVE_PASSENGER_DETAILS_ERROR) {
    return { ...state, passenger_loading: false };
  }

  if (action.type == REPRICE_BEGIN) {
    return { ...state, reprice_loading: true };
  }
  if (action.type == REPRICE_SUCCESS) {
    return {
      ...state,
      reprice_loading: false,
      reprice_data: action.payload ? action.payload : {},
    };
  }
  if (action.type == REPRICE_ERROR) {
    return { ...state, reprice_loading: false };
  }

  if (action.type == BOOKING_BEGIN) {
    return { ...state, booking_loading: true };
  }
  if (action.type == BOOKING_SUCCESS) {
    return {
      ...state,
      booking_loading: false,
      booking_data: action.payload ? action.payload : {},
    };
  }
  if (action.type == BOOKING_ERROR) {
    return { ...state, booking_loading: false };
  }

  if (action.type == CLEAR_FLIGHT_DATA) {
    return { ...state, flight_Data: [], return_flight_data: [] };
  }

  if (action.type == WALLET_API_BEGIN) {
    return { ...state, balance_loading: true };
  }
  if (action.type == WALLET_API_SUCCESS) {
    return { ...state, balance_loading: false, balance_data: action.payload };
  }
  if (action.type == WALLET_API_ERROR) {
    return { ...state, balance_loading: false };
  }
  if (action.type == GET_BOOKING_BEGIN) {
    return { ...state, get_booking_loading: true };
  }
  if (action.type == GET_BOOKING_SUCCESS) {
    return {
      ...state,
      get_booking_loading: false,
      get_booking_data: action.payload ? action.payload : {},
    };
  }
  if (action.type == GET_BOOKING_ERROR) {
    return { ...state, get_booking_loading: false };
  }
};

export default flight_reducer;
