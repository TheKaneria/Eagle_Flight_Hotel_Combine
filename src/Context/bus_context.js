import { createContext, useContext, useReducer } from "react";
import bus_reducer from "../Reducer/bus_reducer";
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
import axios from "axios";
import { getDestination, getRoutes, getSources } from "../Utils/Constant";

const initialState = {
  source_loading: false,
  source_data: [],
  destination_loading: false,
  destination_data: [],
  route_loading: false,
  route_data: [],
};

const BusContext = createContext();
export const BusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bus_reducer, initialState);

  const GetSources = async () => {
    dispatch({ type: GET_SOURCE_BEGIN });
    try {
      const res = await axios.post(
        getSources,
        {
          verifyCall: "ITS_UAT_74396040927B60436124249057b187C5erBNMLQo33ec3",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      if (res.data.status === 1) {
        dispatch({
          type: GET_SOURCE_SUCCESS,
          payload: res.data.data.ITSSources,
        });
        console.log("Get Sourc no log", res.data.data.ITSSources);
      }
    } catch (error) {
      dispatch({ type: GET_SOURCE_ERROR });
      console.log("Error aave he getsource ma", error);
    }
  };

  const GetDestination = async (param) => {
    dispatch({ type: GET_DESTINATION_BEGIN });

    const formdata = new FormData();
    formdata.append(
      "verifyCall",
      "ITS_UAT_74396040927B60436124249057b187C5erBNMLQo33ec3"
    );
    formdata.append("sourceID", param);

    try {
      const response = await axios.post(getDestination, formdata, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
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
      console.log("error aave he getdestination ma ", error);
    }
  };

  const GetRoutes = async (params) => {
    dispatch({ type: GET_ROUTES_BEGIN });

    try {
      const res = await axios.post(getRoutes, params);
      if (res.data.status === 1) {
        dispatch({
          type: GET_ROUTES_SUCCESS,
          payload: res.data.data.AllRouteBusLists,
        });
      }
    } catch (error) {
      dispatch({ type: GET_ROUTES_ERROR });
      console.log("Error aave he getroutes ma", error);
    }
  };

  return (
    <BusContext.Provider
      value={{ ...state, GetSources, GetDestination, GetRoutes }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBusContext = () => {
  return useContext(BusContext);
};
