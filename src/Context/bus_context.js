import { createContext, useContext, useReducer } from "react";
import bus_reducer from "../Reducer/bus_reducer";
import {
  CANCELLATION_DETAILS_BEGIN,
  CANCELLATION_DETAILS_ERROR,
  CANCELLATION_DETAILS_SUCCESS,
  CANCELLATION_POLICY_BEGIN,
  CANCELLATION_POLICY_ERROR,
  CANCELLATION_POLICY_SUCCESS,
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
  GET_CITY_PAIR_BEGIN,
  GET_CITY_PAIR_ERROR,
  GET_CITY_PAIR_SUCCESS,
  GET_DESTINATION_BEGIN,
  GET_DESTINATION_ERROR,
  GET_DESTINATION_SUCCESS,
  GET_FETCH_TICKET_PRINT_DATA_BEGIN,
  GET_FETCH_TICKET_PRINT_DATA_ERROR,
  GET_FETCH_TICKET_PRINT_DATA_SUCCESS,
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
} from "../Actions";
import axios from "axios";
import {
  ACCEPT_HEADER,
  canceldetails,
  dynamic_curl,
  get_bus_booking,
  getDestination,
  getRoutes,
  getSources,
} from "../Utils/Constant";

const initialState = {
  source_loading: false,
  source_data: [],
  destination_loading: false,
  destination_data: [],
  route_loading: false,
  route_data: [],
  amenities_data: [],
  amenities_loading: false,
  citypair_data: [],
  citypair_loading: false,
  seats_data: [],
  seats_loading: false,
  book_seat_data: {},
  book_seat_data_loading: false,
  book_seat_details_data: [],
  book_seat_details_data_loading: false,
  fetch_ticket_print_data: {},
  fetch_ticket_print_loading: false,
  ticket_status: {},
  ticket_status_loading: false,
  booking_data: [],
  booking_data_loading: false,
  get_cancellation_policy: {},
  get_cancellation_policy_loading: false,
  journey_datewise_cancellation_policy: {},
  journey_datewise_cancellation_policy_loading: false,
  routewie_cancellation_policy: {},
  routewise_cancellation_policy_loading: false,
  cancellation_details: {},
  cancellation_details_loading: false,
  confirm_cancellation: {},
  confirm_cancellation_loading: false,
  partial_cancellation_details: {},
  partial_cancellation_details_loading: false,
  confirm_partial_cancellation: {},
  confirm_partial_cancellation_loading: false,

  from_city: "",
  to_city: "",
  selectedTabMainHome: "buses",
};

const BusContext = createContext();
export const BusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bus_reducer, initialState);

  const GetSources = async (params) => {
    dispatch({ type: GET_SOURCE_BEGIN });
    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });

      if (res.data.status == 1) {
        dispatch({
          type: GET_SOURCE_SUCCESS,
          payload: res.data.data.ITSSources,
        });
        console.log("Get Source log", res.data.data.ITSSources);
      }
    } catch (error) {
      dispatch({ type: GET_SOURCE_ERROR });
      console.log("Error getsource", error);
    }
  };

  const GetDestination = async (param) => {
    dispatch({ type: GET_DESTINATION_BEGIN });

    try {
      const response = await axios.post(dynamic_curl, param, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (response.data.status == 1) {
        dispatch({
          type: GET_DESTINATION_SUCCESS,
          payload: response.data.data.ITSDestinations,
        });
      }
    } catch (error) {
      dispatch({ type: GET_DESTINATION_ERROR });
      console.log("error getdestination", error);
    }
  };

  const GetRoutes = async (params) => {
    dispatch({ type: GET_ROUTES_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: GET_ROUTES_SUCCESS,
          payload: res.data.data.AllRouteBusLists,
        });
      }
    } catch (error) {
      dispatch({ type: GET_ROUTES_ERROR });
      console.log("Error getroutes", error);
    }
  };

  const GetSeatArrangementDetail = async (params) => {
    dispatch({ type: GET_SEAT_ARRANGEMENT_DETAILS_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: GET_SEAT_ARRANGEMENT_DETAILS_SUCCESS,
          payload: res.data.data.ITSSeatDetails,
        });
      }
    } catch (error) {
      dispatch({ type: GET_SEAT_ARRANGEMENT_DETAILS_ERROR });
      console.log("Error getroutes", error);
    }
  };

  const GetAmenitiesApi = async (params) => {
    dispatch({ type: GET_AMENITIES_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: GET_AMENITIES_SUCCESS,
          payload: res.data.data.GetAmenities,
        });
      }
    } catch (error) {
      dispatch({ type: GET_AMENITIES_ERROR });
      console.log("Error GetAmenitiesApi", error);
    }
  };

  const GetCityPairApi = async (params) => {
    dispatch({ type: GET_CITY_PAIR_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: GET_CITY_PAIR_SUCCESS,
          payload: res.data.data.ITSCityPair,
        });
      }
    } catch (error) {
      dispatch({ type: GET_CITY_PAIR_ERROR });
      console.log("Error get city pair", error);
    }
  };

  const GetBookSeatApi = async (params, token) => {
    dispatch({ type: GET_BOOK_SEAT_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = res.data;
      if (resData.data[0].Status == 1) {
        dispatch({
          type: GET_BOOK_SEAT_SUCCESS,
          payload: resData.data[0],
        });
        return resData.data[0];
      }
    } catch (error) {
      dispatch({ type: GET_BOOK_SEAT_ERROR });
      console.log("Error get city pair", error);
    }
  };

  const GetBookSeatDetailsApi = async (params) => {
    dispatch({ type: GET_BOOK_SEAT_DETAILS_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: GET_BOOK_SEAT_DETAILS_SUCCESS,
          payload: res.data.data.ITSBookSeatDetails,
        });
      }
      //  else {
      //   dispatch({ type:  GET_BOOK_SEAT_DETAILS_ERROR });
      // }
    } catch (error) {
      dispatch({ type: GET_BOOK_SEAT_DETAILS_ERROR });
      console.log("Error get book seat details", error);
    }
  };

  const fetchTicketPrintDataApi = async (params) => {
    dispatch({ type: GET_FETCH_TICKET_PRINT_DATA_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });

      if (res.data.status == 1) {
        const ticketData = res.data.data.TicketPrintData;

        dispatch({
          type: GET_FETCH_TICKET_PRINT_DATA_SUCCESS,
          payload: ticketData,
        });

        return ticketData;
      } else {
        dispatch({ type: GET_FETCH_TICKET_PRINT_DATA_ERROR });
        return null;
      }
    } catch (error) {
      dispatch({ type: GET_FETCH_TICKET_PRINT_DATA_ERROR });
      console.log("Error get book seat details", error);
      return null;
    }
  };

  const TicketStatusApi = async (params) => {
    dispatch({ type: GET_TICKET_STATUS_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: GET_TICKET_STATUS_SUCCESS,
          payload: res.data.data.TicketPrintData,
        });
      }
    } catch (error) {
      dispatch({ type: GET_TICKET_STATUS_ERROR });
      console.log("Error get book seat details", error);
    }
  };

  const ticketBookingDataApi = async (params) => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    dispatch({ type: GET_TICKET_BOOKING_DATA_BEGIN });

    try {
      const res = await axios.get(get_bus_booking, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });
      if (res.data.success == 1) {
        console.log("Ticket booking data", res.data.data);
        dispatch({
          type: GET_TICKET_BOOKING_DATA_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      dispatch({ type: GET_TICKET_BOOKING_DATA_ERROR });
      console.log("Error get book data", error);
    }
  };

  const ticketCancelDetailsapi = async (params) => {
    dispatch({ type: CANCELLATION_DETAILS_BEGIN });
    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });

      if (res.data.status == 1) {
        dispatch({
          type: CANCELLATION_DETAILS_SUCCESS,
        });
      }
    } catch (error) {
      dispatch({ type: CANCELLATION_DETAILS_ERROR });
      console.log("Error in cancellation details api ", error);
    }
  };

  const ticketCancellationPolicy = async (params) => {
    dispatch({ type: CANCELLATION_POLICY_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: CANCELLATION_POLICY_SUCCESS,
          // payload: res.data.data.GetCancellationPolicy,
        });
      }
    } catch (error) {
      dispatch({ type: CANCELLATION_POLICY_ERROR });
      console.log("error in cancellation policy api ", error);
    }
  };

  const journeydatewiseCancellation = async (params) => {
    dispatch({ type: JOURNEYDATEWISE_CANCELLATION_POLICY_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: JOURNEYDATEWISE_CANCELLATION_POLICY_SUCCESS,
          // payload: res.data.data.GetJourneyDatewiseCancellationPolicy,
        });
      }
    } catch (error) {
      dispatch({ type: JOURNEYDATEWISE_CANCELLATION_POLICY_ERROR });
      console.log("error in journey datewise cancellation api ", error);
    }
  };

  const routewiseCancellationPolicy = async (params) => {
    dispatch({ type: ROUTEWISE_CANCELLATION_POLICY_BEGIN });
    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: ROUTEWISE_CANCELLATION_POLICY_SUCCESS,
          // payload: res.data.data.GetRouteWiseCancellationPolicy,
        });
      }
    } catch (error) {
      dispatch({ type: ROUTEWISE_CANCELLATION_POLICY_ERROR });
      console.log("error in routewise cancellation policy api ", error);
    }
  };

  const confirmCancellation = async (params) => {
    dispatch({ type: CONFIRM_CANCELLATION_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: CONFIRM_CANCELLATION_SUCCESS,
          // payload: res.data.data.ConfirmCancellation,
        });
      }
    } catch (error) {
      dispatch({ type: CONFIRM_CANCELLATION_ERROR });
      console.log("Error in confirm cancellation api ", error);
    }
  };

  const partialCancellation = async (params) => {
    dispatch({ type: PARTIAL_CANCELLATION_DETAILS_BEGIN });

    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: PARTIAL_CANCELLATION_DETAILS_SUCCESS,
          // payload: res.data.data.PartialCancellationDetails,
        });
      }
    } catch (error) {
      dispatch({ type: PARTIAL_CANCELLATION_DETAILS_ERROR });
      console.log("Error in partial cancellation api ", error);
    }
  };

  const confirmPartialCancellation = async (params) => {
    dispatch({ type: CONFIRM_PARTIAL_CANCELLATION_BEGIN });
    try {
      const res = await axios.post(dynamic_curl, params, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      });
      if (res.data.status == 1) {
        dispatch({
          type: CONFIRM_PARTIAL_CANCELLATION_SUCCESS,
          // payload: res.data.data.ConfirmPartialCancellation,
        });
      }
    } catch (error) {
      dispatch({ type: CONFIRM_PARTIAL_CANCELLATION_ERROR });
      console.log("Error in confirm partial cancellation api ", error);
    }
  };

  const Fromcity = (from_city) => {
    dispatch({ type: FROM_CITY, payload: from_city });
  };

  const Tocity = (from_city) => {
    dispatch({ type: TO_CITY, payload: from_city });
  };

  const TabSelection = (tab) => {
    dispatch({ type: SELECTED_TAB, payload: tab });
  };

  return (
    <BusContext.Provider
      value={{
        ...state,
        GetSources,
        GetDestination,
        GetRoutes,
        GetSeatArrangementDetail,
        GetAmenitiesApi,
        GetCityPairApi,
        GetBookSeatApi,
        GetBookSeatDetailsApi,
        fetchTicketPrintDataApi,
        Fromcity,
        Tocity,
        TabSelection,
        TicketStatusApi,
        ticketBookingDataApi,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBusContext = () => {
  return useContext(BusContext);
};
