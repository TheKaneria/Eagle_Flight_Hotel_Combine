import {
  GET_DESTINATION_BEGIN,
  GET_DESTINATION_ERROR,
  GET_DESTINATION_SUCCESS,
  GET_ROUTES_BEGIN,
  GET_ROUTES_ERROR,
  GET_ROUTES_SUCCESS,
  GET_SOURCE_BEGIN,
  GET_SOURCE_ERROR,
  GET_SOURCE_SUCCESS,
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
  } else {
    return { ...state };
  }
};

export default bus_reducer;
