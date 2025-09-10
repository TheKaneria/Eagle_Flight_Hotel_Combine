import React, { useState, useRef, useEffect } from "react";
import "./Homehero.css";
import "bootstrap/dist/css/bootstrap.min.css";
import images from "../../Constants/images";
import {
  FaPlaneDeparture,
  FaBed,
  FaCar,
  FaIndianRupeeSign,
  FaTv,
  FaBottleWater,
} from "react-icons/fa6";
import {
  BsBusFront,
  BsFillHandbagFill,
  BsFillLuggageFill,
  BsInfoCircle,
} from "react-icons/bs";
import { IoAirplaneSharp } from "react-icons/io5";
import { BiBlanket, BiSolidPlaneAlt } from "react-icons/bi";
import { LuLampDesk } from "react-icons/lu";
import {
  FaChevronDown,
  FaExchangeAlt,
  FaSearch,
  FaRupeeSign,
  FaSort,
  FaWifi,
} from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  ACCEPT_HEADER,
  ACCEPT_HEADER1,
  availabilitycurl,
  createItinerary,
  flightsearch,
  get_recent_search,
  getamenities,
  getcancellationpolicy,
  getcitypair,
  getcompanylist,
  getDestination,
  getFare,
  getRoutes,
  getSources,
  recent_search,
  seararrangementdetails,
  searchcurl,
  sectorscurl,
  supplieravailabilitycurl,
  suppliersearchcurl,
  verifyCall,
} from "../../Utils/Constant";
import axios from "axios";
import Notification from "../../Utils/Notification";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosBatteryCharging } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import { useAuthContext } from "../../Context/auth_context";
import { toast } from "react-toastify";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimation,
} from "framer-motion";
import { useBusContext } from "../../Context/bus_context";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { useFlightContext } from "../../Context/flight_context";
import {
  Tabs,
  Tab,
  Box,
  Skeleton,
  Switch,
  FormControlLabel,
} from "@mui/material";

const tabs = [
  { name: "Flights", icon: <FaPlaneDeparture size={25} />, key: "flights" },
  { name: "Stays", icon: <FaBed size={25} />, key: "stays" },
  { name: "Car Rental", icon: <FaCar size={25} />, key: "car" },
  {
    name: "Buses",
    icon: <BsBusFront size={25} />,
    key: "buses",
  },
];
const options = [
  { id: 1, name: "One-way" },
  { id: 2, name: "Round-Trip" },
  { id: 3, name: "Multi-city" },
];
const classes = [
  { id: 1, name: "All" },
  { id: 2, name: "Economy" },
  { id: 4, name: "Business" },
  { id: 6, name: "First" },
  { id: 5, name: "Premium Business" },
  { id: 3, name: "Premium Economy" },
];

const HomeHero = () => {
  const animatedComponents = makeAnimated();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedtab, setSelectedtab] = useState(() => {
    return localStorage.getItem("selectedTab") || "flights";
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selected, setSelected] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [isDropdownOpenTraveler, setIsDropdownOpenTravellers] = useState(false);
  const [travellers, setTravellers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [visibleCount, setVisibleCount] = useState(10);

  const { cancellation_policy } = useAuthContext();

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedtab);
  }, [selectedtab]);

  const handleSelecttripoption = (opt) => {
    if (opt.name === "One-way") {
      setSelected(0);
      setSelectedValue("");
      setSelectedValue2("");
      setDate1(null);
      setDate2(null);
      setFrom("");
      setTo("");
      setResultIndex([]);
      setSelectedDate(null);
      setSelectedDate2(null);
      setDefaultMonth(null);
      setDefaultMonth2(null);
    } else if (opt.name === "Round-Trip") {
      setSelected(1);
      setSelectedValue("");
      setSelectedValue2("");
      setDate1(null);
      setDate2(null);
      setFrom("");
      setTo("");
      setResultIndex([]);
      setSelectedDate(null);
      setSelectedDate2(null);
      setDefaultMonth(null);
      setDefaultMonth2(null);
    } else {
      setSelected(2);
      setSelectedValue("");
      setSelectedValue2("");
      setDate1(null);
      setDate2(null);
      setFrom("");
      setTo("");
      setResultIndex([]);
      setSelectedDate(null);
      setSelectedDate2(null);
      setDefaultMonth(null);
      setDefaultMonth2(null);
    }

    setSelectedOption(opt);
    setIsOpen(false);
  };
  const swapLocations = () => {
    const newFrom = to;
    const newTo = from;
    setFrom(newFrom);
    setTo(newTo);
    dateAvailability(newFrom.city_code, newTo.city_code);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      minHeight: "initial",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      position: "absolute",
      width: "100%",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "300px",
      overflowY: "auto",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "2px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    // ✅ Add this to remove the blue highlight
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#4a90e2" : "white", // customize this as needed
      color: state.isFocused ? "white" : "black",
      cursor: "pointer",
    }),
  };

  const [selectedClass, setSelectedClass] = useState(1);
  const [getOnwardDateList, setOnwardDateList] = useState([]);
  const [getReturnDateList, setReturnDateList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue2, setSelectedValue2] = useState("");
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [getDepCityCode, setDepCityCode] = useState("");
  const [getArrCityCode, setArrCityCode] = useState("");
  const [availableMonths, setAvailableMonths] = useState([]);
  const [defaultMonth, setDefaultMonth] = useState("");
  const [defaultMonth2, setDefaultMonth2] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [login, SetLogin] = useState("");
  const [userRole, setUserRole] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [RecentSelection, setRecentSelection] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [getindex, setIndex] = useState("");
  const [flightdata, setFlightData] = useState("");

  // AIR IQ API State Start
  const API_KEY =
    "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OmpTMm0vUU1HVmQvelovZi81dFdwTEE9PQ==";

  const [getAvailableDate, setAvailableDate] = useState([]);
  const [getSectorListTo, setSectorListTo] = useState([]);
  const [getCondition, setCondition] = useState();
  const [depcitylistload, setdepcitylistload] = useState(false);
  const [arrcitylistload, setarrcitylistload] = useState(false);
  const [sortedFlights, setsortedFlights] = useState([]);
  const [sortedCheapFlights, setsortedCheapFlights] = useState([]);
  const [fromBusId, setFromBusId] = useState();
  const [toBusId, setToBusId] = useState();
  const [returnflightTab, setReturnFlightTab] = useState(0);
  const [resultIndex, setResultIndex] = useState([]);

  const handleReturnFlightTabChange = (newValue) => {
    setReturnFlightTab(newValue);
  };

  const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [getCompanyId, setCompanyId] = useState();

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    var companyid = localStorage.getItem("companyid");
    if (companyid) {
      setCompanyId(companyid);
    }

    // const getAmenitiesBus = async () => {
    //   const formdata = new FormData();
    //   await formdata.append("type", "POST");
    //   await formdata.append("url", getamenities);
    //   await formdata.append("verifyCall", verifyCall);
    //   await formdata.append("companyID", companyid);

    //   const data = await GetAmenitiesApi(formdata);

    //   if (data) {
    //     // console.log("Amenities data", data);
    //   }
    // };

    // return getAmenitiesBus();
  }, []);

  const navigate = useNavigate();

  const [getfilerdata, setfilterData] = useState([]);
  const [recentswap, setrecentswap] = useState(0);

  const handleSelect = async (item, skipToReset = false) => {
    if (!item) {
      setFrom(null);
      return;
    }

    const selectedCity = item.city_name;
    const airportCode = item.airport_code ?? item.city_code;
    setDepCityCode(item.airport_code ?? item.city_code);
    setSelectedValue(`${selectedCity} (${airportCode})`);
    setIsDropdownOpen(false);
    setSelectedValue2("");
    setTo(null);
    setSelectedDate(null);
    setDate1("");
    setDefaultMonth("");
    setSelectedIndex(null);
    setCondition(1);
    setDefaultMonth2("");
    setSelectedDate2(null);
    setSelectedValue2("");
    setFrom(item);
  };

  const handleCounterChange = (type, change) => {
    setfilterData([]);
    setsortedFlights([]);
    setsortedCheapFlights([]);

    setTravellers((prev) => {
      const newValue = prev[type] + change;

      // Ensure "Adult" value does not go below 1
      if (type === "adult" && newValue < 1) {
        return prev;
      }

      // Prevent other categories (child, infant) from going below 0
      if (newValue < 0) {
        return prev;
      }

      return { ...prev, [type]: newValue };
    });
  };

  const totalTravellers =
    travellers.adult + travellers.child + travellers.infant;

  const toggleDropdownTraveler = () => {
    setIsDropdownOpenTravellers((prev) => !prev);
  };

  const handleSelect2 = (item) => {
    console.log("parth-2", JSON.stringify(item, null, 2));
    setrecentswap(0);
    if (!item) {
      setTo(null);
      return;
    }
    if (to?.city_code === item.city_code) return;
    setTo(item);
    setDate1("");
    setSelectedDate(null);
    setDefaultMonth(null);
    setSelectedValue2(item.city_name);
    setArrCityCode(item.city_code);
    setIsDropdownOpen2(false);
    getOnwardDate(from?.city_code || getDepCityCode, item.city_code);
    if (userRole === "2") {
    } else if (userRole === "3") {
      dateAvailabilitySupplier(item.city_code);
    }
  };

  const onChange = (date, dateString) => {
    const momentDate = moment(dateString, "ddd D/M");
    const formattedDate = momentDate.format("YYYY-MM-DD");
    const formattedDatee = dayjs(date)
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm:ss");

    setDate1(formattedDatee);
    setSelectedDate(date);

    if (selected == 1) {
      getReturnDate(formattedDate, 1, getArrCityCode);
    }
    setIsDatePickerOpen(false);
  };

  const onChange2 = (date, dateString) => {
    const formattedDate = moment(dateString, "DD-MM-YYYY").format("YYYY-MM-DD");
    const formattedDatee = dayjs(date)
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm:ss");
    setDate2(formattedDatee);
    setSelectedDate2(date);
  };

  useEffect(() => {
    const onwardDates = (getOnwardDateList || []).map(
      (item) => item?.onward_date
    );
    const formattedAvailableDates = (getAvailableDate || []).map(
      (item) => item
    );
    let allDates = [...onwardDates, ...formattedAvailableDates];
    const today = moment();
    const futureDates = allDates
      .map((date) => moment(date, "YYYY-MM-DD"))
      .filter((date) => date.isValid() && date.isSameOrAfter(today))
      // .sort((a, b) => a.diff(today));
      .sort((a, b) => a.diff(b));

    if (futureDates.length > 0) {
      const months = [
        ...new Set(futureDates.map((item) => item.format("YYYY-MM"))),
      ];
      const defaultmonth = futureDates[0];
      setDefaultMonth(defaultmonth);
      setAvailableMonths(months);
    } else {
      setDefaultMonth(null);
      setAvailableMonths([]);
    }
  }, [getOnwardDateList, getAvailableDate]);

  const disableAllExceptApiDates = (current) => {
    const formattedDate = current.format("YYYY-MM-DD");
    const onwardDates = (getOnwardDateList || []).map(
      (item) => item?.onward_date
    );

    const formattedAvailableDates = (getAvailableDate || []).map(
      (item) => item
    );

    const allDates = [...onwardDates, ...formattedAvailableDates];

    return !allDates.includes(formattedDate);
  };

  const disableDates = (current) => {
    const returndate = getReturnDateList.map(
      (date) => new Date(date.return_date).toISOString().split("T")[0]
    );
    return !returndate.includes(current.format("YYYY-MM-DD"));
  };

  const firstEnabledDate = dayjs(
    getReturnDateList[0]?.return_date || dayjs().format("YYYY-MM-DD")
  );

  const getPublicIP = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip; // Returns the public IP
    } catch (error) {
      console.error("Error fetching public IP:", error);
      return null; // Handle errors by returning null or a default value
    }
  };

  function logout() {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }

  const getOnwardDate = async (dep_city_code, citycode) => {
    const token = "4-2-3721-KRAZY-389-xnewkncBUI8";
    const publicIP = await getPublicIP();

    if (!publicIP) {
      console.error("Unable to fetch public IP. Request cannot be completed.");
      return;
    }

    const url = "https://devapi.fareboutique.com/v1/fbapi/onward_date";
    const payload = {
      trip_type: selected,
      end_user_ip: publicIP,
      token: token,
      // dep_city_code: getDepCityCode,
      dep_city_code: dep_city_code,
      arr_city_code: citycode,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // "Access-Control-Allow-Origin": "*", // Allow requests from any origin
          "Content-Type": "application/json", // Add any other headers required
        },
        body: JSON.stringify(payload),
      });

      // Parse the JSON response
      const data = await response.json();

      if (data.replyCode === "success") {
        // console.log("Response Dates from API ZEEL:", data);
        setOnwardDateList(data.data);

        const months = [
          ...new Set(
            data.data.map((item) => moment(item.onward_date).format("YYYY-MM"))
          ),
        ];
        const defaultmonth = moment(data.data[0].onward_date, "YYYY-MM-DD");

        getReturnDate(defaultmonth._i, 2, citycode);
        setDefaultMonth(defaultmonth);
        setAvailableMonths(months);
        console.log("defaultmonth._i", defaultmonth._i);
      } else {
        console.log("error", "Error!", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error while fetching departure city list:", error);
    }
  };

  const getReturnDate = async (citycode, code, arrCityCode) => {
    const token = "4-2-3721-KRAZY-389-xnewkncBUI8";
    const publicIP = await getPublicIP();
    const formateddate = moment(citycode).format("YYYY-MM-DD");

    if (!publicIP) {
      console.error("Unable to fetch public IP. Request cannot be completed.");
      return;
    }

    const url = "https://devapi.fareboutique.com/v1/fbapi/return_date";
    const payload = {
      trip_type: selected,
      end_user_ip: publicIP,
      token: token,
      dep_city_code: getDepCityCode,
      onward_date: code == 2 ? citycode : formateddate,
      arr_city_code: arrCityCode,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // "Access-Control-Allow-Origin": "*", // Allow requests from any origin
          "Content-Type": "application/json", // Add any other headers required
        },
        body: JSON.stringify(payload),
      });

      // Parse the JSON response
      const data = await response.json();

      if (data.replyCode === "success") {
        console.log("Response Return Dates from API:", data);
        setReturnDateList(data.data);
        const defaultmonth = moment(data.data[0].return_date, "YYYY-MM-DD");
        setDefaultMonth2(defaultmonth);

        // Notification("success", "Success!", data.message);
      } else {
        // Notification("error", "Error!", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error while fetching departure city list:", error);
      // Notification("error", "Error!", "Failed to fetch data");
    }
  };

  const RecentSearch = (
    selectedValue,
    selectedValue2,
    adult,
    child,
    infant,
    totalTravellers,
    depdate,
    arrdate,
    getDepCityCode,
    getArrCityCode,
    condition,
    selected,
    returndate,
    lowestPrice
  ) => {
    // console.log("selected", selected);

    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    formdata.append("departure_city", selectedValue);
    formdata.append("arrival_city", selectedValue2);
    formdata.append("adult_travelers", adult);
    formdata.append("child_travelers", child);
    formdata.append("infant_travelers", infant);
    formdata.append("total_travelers", totalTravellers);
    formdata.append("departure_date", depdate);
    formdata.append("arrival_date", arrdate);
    formdata.append("departure_city_code", getDepCityCode);
    formdata.append("arrival_city_code", getArrCityCode);
    formdata.append("get_condition", condition);
    formdata.append("is_return", selected);
    formdata.append("price", lowestPrice);

    if (selected == 1) {
      formdata.append("return_departure_date", returndate ? returndate : "");
    }

    console.table(Object.fromEntries(formdata.entries()));

    // setTimeout(() => {
    axios
      .post(recent_search, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.status === "Token is Expired") {
          logout();
        } else if (res.data.success == 1) {
          GetRecentSearch();
        }
      })
      .catch((err) => {
        console.log("ERROR in recent search ", err);
      });
    // }, 3000); // 1 second delay
  };

  const handleRecentClick = async (item) => {
    console.log("Clicked item:", item);
    if (recentswap == 0) {
      setrecentswap(1);
    } else {
    }

    // Step 1: Create From Option manually
    const fromOption = {
      value: item?.departure_city_code || item?.city_code,
      label: item?.departure_city,
      airport_name: item?.departure_airport_name,
      airport_code: item?.departure_city_code,
      city_name: item?.departure_city,
    };
    console.log("fromOption", fromOption);

    setSelectedIndex(item);
    setFrom(fromOption || null);
    setSelectedValue(fromOption);

    // Step 2: Create To Option manually
    const toOption = {
      value: item?.arrival_city_code,
      label: item?.arrival_city,
      airport_name: item?.arrival_airport_name,
      airport_code: item?.arrival_city_code,
      city_name: item?.arrival_city,
    };
    console.log("toOption", toOption);
    setTo(toOption || null);
    setSelectedValue2(toOption);

    // Step 3: Set Dates
    setSelectedDate(item.departure_date);
    if (item.is_return == 1) {
      setSelectedDate2(item.return_departure_date);
    }

    // Step 4: Set Travellers
    setTravellers({
      adult: Number(item.adult_travelers),
      child: Number(item.child_travelers),
      infant: Number(item.infant_travelers),
    });

    // Step 5: Set condition
    setCondition(item?.get_condition);
  };

  const dateAvailability = async (originCode, destinationcode) => {
    const token = JSON.parse(localStorage.getItem("is_token_airiq"));
    const headers = new Headers(ACCEPT_HEADER1);
    headers.append("Authorization", token);

    console.log("getDepCityCode", originCode);

    const payload = {
      // origin: getDepCityCode,
      origin: originCode,
      destination: destinationcode,
    };

    try {
      const response = await fetch(
        availabilitycurl,

        {
          method: "POST",
          headers: headers,
          Authorization: token,
          body: JSON.stringify(payload),
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        console.log("Response Available Date from API:", data);

        const formattedDates = data?.data?.map((date) => {
          let [day, month, year] = date.split("-");
          return `${year}-${monthMap[month]}-${day}`;
        });
        // console.log("formatted numeric date", formattedDates);
        setAvailableDate(formattedDates); // Set formatted dates

        const months = [
          ...new Set(
            formattedDates.map((item) => moment(item).format("YYYY-MM"))
          ),
        ];

        const defaultmonth = moment(formattedDates[0], "YYYY-MM-DD"); // Ensure correct format
        setDefaultMonth(defaultmonth);
        setAvailableMonths(months);
        console.log("defaultmonth", defaultmonth);

        // Notification("success", "Success!", data.message);
      } else {
        // Notification("error", "Error!", data.message || "Something went wrong");
        setAvailableDate([]);
        setSelectedDate("");
        setDefaultMonth("");
        console.log("elseeee");
      }
    } catch (error) {
      console.error("Error while fetching departure city list:", error);
      // Notification("error", "Error!", "Failed to fetch data");
    }
  };

  const dateAvailabilitySupplier = async (destinationcode) => {
    const token = JSON.parse(localStorage.getItem("is_token_airiq"));
    const headers = new Headers(ACCEPT_HEADER1);
    headers.append("Authorization", token);

    const payload = {
      origin: getDepCityCode,
      destination: destinationcode,
    };

    try {
      const response = await fetch(
        supplieravailabilitycurl,
        // proxy + "https://omairiq.azurewebsites.net/supplieravailability",

        // {
        //   method: "POST",
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Content-Type": "application/json",
        //     "api-key": API_KEY,
        //     Authorization: token,
        //   },
        //   body: JSON.stringify(payload),
        // }

        {
          method: "POST",
          headers: headers,
          Authorization: token,
          body: JSON.stringify(payload),
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (data.status === "success" && data.message !== "Data not found") {
        console.log("Response Available Date from API:", data);

        const formattedDates = data?.data?.map((date) => {
          let [day, month, year] = date.split("-");
          return `${year}-${monthMap[month]}-${day}`;
        });
        // console.log("formatted numeric date", formattedDates);
        setAvailableDate(formattedDates); // Set formatted dates

        // const months = [
        //   ...new Set(
        //     formattedDates.map((item) => moment(item).format("YYYY-MM"))
        //   ),
        // ];

        // const defaultmonth = moment(formattedDates[0], "YYYY-MM-DD"); // Ensure correct format
        // setDefaultMonth(defaultmonth);
        // setAvailableMonths(months);

        // console.log("defaultmonth._i", defaultmonth);

        // Notification("success", "Success!", data.message);
      } else {
        // Notification("error", "Error!", data.message || "Something went wrong");
        setAvailableDate([]);
        setSelectedDate("");
        setDefaultMonth("");
      }
    } catch (error) {
      console.error("Error while fetching departure city list:", error);
      // Notification("error", "Error!", "Failed to fetch data");
    }
  };

  const GetRecentSearch = () => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    axios
      .get(get_recent_search, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.status === "Token is Expired") {
          logout();
        } else if (res.data.success === 1) {
          // console.log("RRRR", res.data.data);
          setRecentSelection(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("ERR in getRecent search api", err);
      });
  };

  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const y1Scroll = useTransform(scrollY, [0, 300], [0, -80]);
  const y2Scroll = useTransform(scrollY, [0, 300], [0, 80]);

  const y1 = useMotionValue(50);
  const y2 = useMotionValue(-50);

  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const {
    GetSources,
    GetDestination,
    destination_data,
    source_data,
    GetRoutes,
    route_data,
    GetSeatArrangementDetail,
    GetAmenitiesApi,
    GetCityPairApi,
    route_loading,
    Fromcity,
    Tocity,
    from_city,
    to_city,
    TabSelection,
    selectedTabMainHome,
    amenities_data,
    ClearRouteData,
  } = useBusContext();

  const {
    FlightSearch,
    flight_Data,
    return_flight_data,
    flight_Loading,
    GetFareRules,
    fare_rules,
    fare_rules_Loading,
    CreateItinerary,
    itinerary_loading,
    ClearFlightData,
  } = useFlightContext();

  useEffect(() => {
    if (from_city) {
      setFrom(from_city);
      setFromBusId(from_city.CityID);
      getDestinationBus(from_city.CityID);
    } else {
    }
    if (to_city) {
      setTo(to_city);
      setToBusId(to_city.CityID);
    } else {
    }
  }, [to_city, from_city]);

  const handleSelectBus = async (item) => {
    if (item) {
      setFrom(item);
      Fromcity(item);
      setFromBusId(item.CityID);
      getDestinationBus(item.CityID);
    } else {
      setFrom(null);
      Fromcity("");
      setTo(null);
      setFromBusId(null);
      setToBusId(null);
      getDestinationBus(null);
    }
  };

  const handleSelectBusTo = async (item) => {
    if (item) {
      setTo(item);
      Tocity(item);
      setToBusId(item.CityID);
      // GetRoutes(item.CityID);
    } else {
      setTo(null);
      Tocity("");
      setToBusId(null);
    }
  };

  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [activeTabName, setActiveTabName] = useState("");

  const toggleTab = (index, tab) => {
    if (activeTabIndex === index && activeTabName === tab) {
      setActiveTabIndex(null);
      setActiveTabName("");
    } else {
      setActiveTabIndex(index);
      setActiveTabName(tab);
    }
  };

  useEffect(() => {
    controls1.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    });
    controls2.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    });

    // After initial anim, connect to scroll values
    const unsubscribeY1 = y1Scroll.onChange((latest) => y1.set(latest));
    const unsubscribeY2 = y2Scroll.onChange((latest) => y2.set(latest));

    return () => {
      unsubscribeY1();
      unsubscribeY2();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsDropdownOpen2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    var islogin = localStorage.getItem("is_login");
    SetLogin(islogin);

    var role = localStorage.getItem("is_role");
    if (islogin) {
      setUserRole(JSON.parse(role));
    }
    // BUSGetCompanyList();
    getSourceBus();
    GetRecentSearch();
    getCityPairBus();
  }, []);

  const parseBoardingPoints = (boardingPointsStr) => {
    if (!boardingPointsStr) return [];
    return boardingPointsStr.split("#").flatMap((group) => {
      const [id, name, time, address] = group.split("|");
      return { id, name, time, address };
    });
  };

  const parseDroppingPoints = (droppingPointsStr) => {
    if (!droppingPointsStr) return [];
    return droppingPointsStr.split("#").flatMap((group) => {
      const [id, name, time] = group.split("|");
      return { id, name, time };
    });
  };

  const getSourceBus = async () => {
    const formdata = new FormData();
    await formdata.append("type", "POST");
    await formdata.append("url", getSources);
    await formdata.append("verifyCall", verifyCall);

    const data = await GetSources(formdata);
    if (data) {
      console.log("bus source data", data);
    }
  };

  const getDestinationBus = async (sourceId) => {
    const formdata = new FormData();
    await formdata.append("type", "POST");
    await formdata.append("url", getDestination);
    await formdata.append("verifyCall", verifyCall);
    await formdata.append("sourceID", sourceId);

    const data = await GetDestination(formdata);
    if (data) {
      console.log("bus destination data", data);
    }
  };

  const NewFlightget = async () => {
    const token = localStorage.getItem("accessToken");
    if (!selectedOption.id) {
      Notification("warning", "Warning!", "Please Select Journey Type");
    } else if (!from) {
      Notification("warning", "Warning!", "Origin Airport Cannot Be Empty");
    } else if (!to) {
      Notification(
        "warning",
        "Warning!",
        "Destination Airport Cannot Be Empty"
      );
    } else if (!date1) {
      Notification("warning", "Warning!", "Journey Date Cannot Be Empty");
    } else if (!selectedClass) {
      Notification("warning", "Warning!", "Please Select Cabinclass");
    } else {
      const formdata = new FormData();
      formdata.append("type", "POST");
      formdata.append("url", flightsearch);
      formdata.append("url_token", `Bearer ${token}`);
      formdata.append("adultCount", travellers.adult);
      formdata.append("childCount", travellers.child);
      formdata.append("infantCount", travellers.infant);
      formdata.append("directFlight", isChecked);
      formdata.append("journeyType", selectedOption.id);
      formdata.append("origin", (from || "").toUpperCase());
      formdata.append("destination", (to || "").toUpperCase());
      formdata.append("preferredDepartureTime", date1);
      if (selected == 1) {
        formdata.append("preferredReturnDepartureTime", date2);
      }
      formdata.append("flightCabinClass", selectedClass);

      await FlightSearch(formdata);
    }
  };

  const ItineraryCreateNew = async (ids, item) => {
    const token = localStorage.getItem("accessToken");
    const traceid = localStorage.getItem("traceID");

    const formdata = new FormData();
    formdata.append("type", "POST");
    formdata.append("url", createItinerary);
    formdata.append("url_token", `Bearer ${token}`);
    formdata.append("traceId", traceid);

    ids.forEach((id, index) => {
      formdata.append(`items[${index}][type]`, "FLIGHT");
      formdata.append(`items[${index}][resultIndex]`, id);
    });

    const okres = await CreateItinerary(formdata);

    // localStorage.setItem("itineraryCode", okres?.itineraryCode);

    const check = selectedOption.id == 2 ? true : false;

    // if (okres) {
    //   if (!okres?.error?.errorCode) {
    //     localStorage.setItem("itineraryCode", okres?.itineraryCode);
    // const check = selectedOption.id == 2 ? true : false;

    // if (okres) {
    navigate("/TicketBookingDetails", {
      state: {
        item: check ? flightdata : item,
        returnitem: check ? item : "",
        totaltraveller: totalTravellers,
        adulttraveler: travellers.adult,
        childtraveler: travellers.child,
        infanttraveler: travellers.infant,
        selected: selected,
        timeing: okres?.traceIdDetails,
      },
    });
    //     }
    //   } else {
    //     Notification("error", "Error", okres.error.errorMessage);
    //   }
    // } else {
    // }
  };

  const FareRuleGet = async (ref) => {
    const traceid = localStorage.getItem("traceID");
    const token = localStorage.getItem("accessToken");

    const formdata = new FormData();
    formdata.append("type", "POST");
    formdata.append("url", getFare);
    formdata.append("url_token", `Bearer ${token}`);
    formdata.append("traceId", traceid);
    formdata.append("resultIndex", ref);

    await GetFareRules(formdata);
  };

  const getRouteBus = async () => {
    if (!fromBusId) {
      toast.warning("Please Select From City");
      return;
    } else if (!toBusId) {
      toast.warning("Please Select To City");
      return;
    } else if (!date1) {
      toast.warning("Please Select Journey Date");
      return;
    } else {
      const formdata = new FormData();
      await formdata.append("type", "POST");
      await formdata.append("url", getRoutes);
      await formdata.append("verifyCall", verifyCall);
      await formdata.append("fromID", fromBusId);
      await formdata.append("toID", toBusId);
      await formdata.append("JourneyDate", moment(date1).format("DD-MM-YYYY"));

      const data = await GetRoutes(formdata);
      if (data) {
        console.log("bus route data", data);
      }
    }
  };

  const getSeatArrangementBus = async (referenceno) => {
    const formdata = new FormData();
    await formdata.append("type", "POST");
    await formdata.append("url", seararrangementdetails);
    await formdata.append("verifyCall", verifyCall);
    await formdata.append("referenceNumber", referenceno);

    const data = await GetSeatArrangementDetail(formdata);
    if (data) {
      console.log("bus seat arrangement data", data);
    }
  };

  const getCityPairBus = async () => {
    const formdata = new FormData();
    await formdata.append("type", "POST");
    await formdata.append("url", getcitypair);
    await formdata.append("verifyCall", verifyCall);

    const data = await GetCityPairApi(formdata);

    if (data) {
      // console.log("get city pair data", data);
    }
  };

  const calculateDuration = (startTime, endTime) => {
    const start = moment(startTime, "hh:mm A");
    const end = moment(endTime, "hh:mm A");

    if (end.isBefore(start)) {
      end.add(1, "day"); // Overnight
    }

    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    return `${hours}h ${minutes}m`;
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };
  const visibleData = route_data?.slice(0, visibleCount);

  return (
    <section className="containerr container-fluid">
      <div className="E9x1-card">
        <div className="E9width60">
          <div className="W5IJ-mod-limit-width">
            <h2 className="AQWr-mod-margin-bottom-xlarge c0qPo">
              {/* <span>Compare flight deals from 100s of sites</span> */}
              {selectedtab === "buses" ? (
                <span>
                  <span>Welcome to Eagle Travels</span>{" "}
                  <span>A Step Ahead... Always!</span>
                </span>
              ) : (
                <span>Compare flight deals from 100s of sites</span>
              )}
              <span className="c9DqH">.</span>
            </h2>
            <div className="tabs-container">
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  className="tab-wrapper"
                  onClick={() => {
                    TabSelection(tab.key);
                    setSelectedtab(tab.key);
                    setFrom("");
                    setTo("");
                    setDate1("");
                    setDate2("");
                    ClearRouteData();
                    ClearFlightData();
                  }}
                >
                  <div
                    className={`tab-icon-box ${
                      selectedtab === tab.key ? "active" : ""
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <div className="tab-name">{tab.name}</div>
                </div>
              ))}
            </div>

            {selectedtab === "flights" ? (
              <div className="d-flex align-items-center justify-content-between">
                <div className="J_T2">
                  <div className="J_T2-header">
                    <div
                      className="dropdown-wrapper"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span>{selectedOption.name}</span>
                      <span className="arrow">
                        <FaChevronDown />
                      </span>
                    </div>

                    {isOpen && (
                      <div className="dropdown-options">
                        {options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`dropdown-option ${
                              opt.id === selectedOption.id ? "active" : ""
                            }`}
                            onClick={() => handleSelecttripoption(opt)}
                          >
                            {opt.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div>Direct Flights </div>{" "}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isChecked}
                        onChange={handleSwitchChange}
                        color="warning"
                      />
                    }
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="flight-search-bar">
              <div className="from-section">
                {selectedtab === "buses" ? (
                  <Select
                    value={from}
                    onChange={
                      selectedtab === "buses" ? handleSelectBus : handleSelect
                    }
                    options={selectedtab === "buses" ? source_data : <></>}
                    isLoading={depcitylistload}
                    styles={customStyles}
                    isClearable={true}
                    placeholder="From?"
                    isSearchable={true}
                    getOptionLabel={(data) => {
                      return selectedtab === "buses"
                        ? data.CityName
                        : `${data.city_name || data.CityName} (${
                            data.airport_code
                          })`;
                    }}
                    formatOptionLabel={(data, { context }) => {
                      if (context === "menu") {
                        return selectedtab === "buses" ? (
                          <div>{data.CityName}</div>
                        ) : (
                          <div>
                            <div>{data.city_name || data.CityName}</div>
                            <div style={{ fontSize: "12px" }}>
                              {data.airport_name}{" "}
                              <span style={{ color: "#f45500" }}>
                                ({data.airport_code})
                              </span>
                            </div>
                          </div>
                        );
                      } else {
                        return selectedtab === "buses" ? (
                          <div className="fw-bold">{data.CityName}</div>
                        ) : (
                          <div>
                            {data.city_name}{" "}
                            <span style={{ color: "#f45500" }}>
                              ({data.airport_code})
                            </span>
                          </div>
                        );
                      }
                    }}
                    components={{
                      ...animatedComponents,
                      DropdownIndicator: () => null,
                    }}
                  />
                ) : (
                  <input
                    value={String(from || "").toUpperCase()}
                    placeholder="Airport Code Only"
                    onChange={(e) => setFrom(e.target.value)}
                    style={{ height: "100%", width: "100%", border: "none" }}
                  />
                )}
              </div>

              {selectedtab === "buses" ? (
                <></>
              ) : (
                <button
                  disabled={recentswap == 1 ? true : false}
                  className="swap-button"
                  onClick={swapLocations}
                >
                  <FaExchangeAlt
                    className={isSwapping ? "spin" : ""}
                    color="#000"
                  />
                </button>
              )}

              <div className="to-section">
                {selectedtab === "buses" ? (
                  <Select
                    value={to}
                    onChange={
                      selectedtab === "buses"
                        ? handleSelectBusTo
                        : handleSelect2
                    }
                    options={
                      selectedtab === "buses"
                        ? destination_data
                        : getSectorListTo
                    }
                    isLoading={arrcitylistload}
                    styles={customStyles}
                    placeholder="To?"
                    isClearable={true}
                    isSearchable={true}
                    getOptionLabel={(data) => {
                      if (selectedtab === "buses") {
                        return data.CityName;
                      } else {
                        const city = data.city_name || data.destination;
                        const code = data.airport_code || data.DestinationCode;
                        return `${city} (${code})`;
                      }
                    }}
                    formatOptionLabel={(data, { context }) => {
                      if (context === "menu") {
                        return (
                          <div>
                            {selectedtab === "buses" ? (
                              <div>{data.CityName}</div>
                            ) : (
                              <>
                                <div>
                                  {data.city_name
                                    ? data.city_name
                                    : data.destination}
                                </div>
                                <div style={{ fontSize: "12px" }}>
                                  {data.airport_name}{" "}
                                  <span style={{ color: "#f45500" }}>
                                    (
                                    {data.airport_code
                                      ? data.airport_code
                                      : data.DestinationCode}
                                    )
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      } else {
                        return selectedtab === "buses" ? (
                          <div className="fw-bold">{data.CityName}</div>
                        ) : (
                          <div>
                            {data.city_name ? data.city_name : data.destination}{" "}
                            <span style={{ color: "#f45500" }}>
                              (
                              {data.airport_code
                                ? data.airport_code
                                : data.DestinationCode}
                              )
                            </span>
                          </div>
                        );
                      }
                    }}
                    components={{
                      ...animatedComponents,
                      DropdownIndicator: () => null,
                    }}
                  />
                ) : (
                  <input
                    value={String(to || "").toUpperCase()}
                    placeholder="Airport Code Only"
                    onChange={(e) => setTo(e.target.value)}
                    style={{ height: "100%", width: "100%", border: "none" }}
                  />
                )}
              </div>

              <div className="custom-date-picker">
                <DatePicker
                  onChange={onChange}
                  placeholder={selectedtab === "buses" ? "Date" : "Departure"}
                  format="ddd D/M"
                  disabledDate={(current) => {
                    const today = dayjs().startOf("day");
                    const sixMonthsLater = today.add(6, "month").endOf("day");
                    return (
                      current && (current < today || current > sixMonthsLater)
                    );
                  }}
                  // disabledDate={disableAllExceptApiDates}
                  value={
                    selectedDate || defaultMonth
                      ? dayjs(selectedDate || defaultMonth)
                      : null
                  }
                  suffixIcon={null}
                />
              </div>

              {getCondition === 0 ||
                (selected === 1 && (
                  <div
                    className={`${
                      selected === 0 && getCondition === 1
                        ? "disabledatepicker"
                        : "custom-date-picker"
                    }`}
                  >
                    <DatePicker
                      disabled={selected == 0 ? true : false}
                      style={{ opacity: selected == 0 ? 0.6 : 1 }}
                      onChange={onChange2}
                      format="ddd D/M"
                      disabledDate={(current) => {
                        const today = dayjs().startOf("day");
                        const sixMonthsLater = today
                          .add(6, "month")
                          .endOf("day");
                        return (
                          current &&
                          (current < today || current > sixMonthsLater)
                        );
                      }}
                      // disabledDate={disableDates}
                      // value={date2 ? moment(date2, "DD-MM-YYYY") : null}
                      value={
                        selectedDate2 || defaultMonth2
                          ? dayjs(selectedDate2 || defaultMonth2)
                          : null
                      }
                      placeholder="Return"
                      suffixIcon={null}
                      defaultPickerValue={firstEnabledDate}
                    />
                  </div>
                ))}
              {selectedtab === "buses" ? (
                <></>
              ) : (
                <>
                  <div
                    className="traveler-section"
                    onClick={toggleDropdownTraveler}
                  >
                    {totalTravellers} Travellers{" "}
                    {isDropdownOpenTraveler && (
                      <div className="travellers-dropdown2">
                        <div className="fw-bold mb-2 fs-5">Travellers</div>
                        <div className="traveller-category">
                          <span>Adult 12+Yrs</span>
                          <div className="counter">
                            <button
                              className="minus"
                              onClick={() => handleCounterChange("adult", -1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              style={{
                                fontSize: "14px",
                                width: "30px",
                                border: "none",
                              }}
                              value={travellers.adult}
                              readOnly
                            />
                            <button
                              className="plus"
                              onClick={() => handleCounterChange("adult", 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="traveller-category">
                          <span>Child 2-12 Yrs</span>
                          <div className="counter">
                            <button
                              className="minus"
                              onClick={() => handleCounterChange("child", -1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              style={{
                                fontSize: "14px",
                                width: "30px",
                                border: "none",
                              }}
                              value={travellers.child}
                              readOnly
                            />
                            <button
                              className="plus"
                              onClick={() => handleCounterChange("child", 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="traveller-category">
                          <span>Infant 0-2 Yrs</span>
                          <div className="counter">
                            <button
                              className="minus"
                              onClick={() => handleCounterChange("infant", -1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              style={{
                                fontSize: "14px",
                                width: "30px",
                                border: "none",
                              }}
                              value={travellers.infant}
                              readOnly
                            />
                            <button
                              className="plus"
                              onClick={() => handleCounterChange("infant", 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div
                          className="mt-3"
                          style={{ border: "1px solid #eee" }}
                        ></div>
                        <div className="mt-3 fw-bold text-dark">
                          Cabin Class
                        </div>
                        <div className="d-flex gap-3 flex-wrap mt-2">
                          {classes.map((classOption) => (
                            <div
                              key={classOption.id}
                              className={`classselekt ${
                                selectedClass === classOption.id
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => setSelectedClass(classOption.id)}
                            >
                              {classOption.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              <button
                className="search-button"
                onClick={() => {
                  if (!login) {
                    Notification("warning", "Please sign in to continue.");
                    return;
                  } else {
                    selectedtab === "buses" ? getRouteBus() : NewFlightget();
                  }
                }}
              >
                <FaSearch />
              </button>
              <button
                className="search-buttonRes"
                onClick={() => {
                  {
                    selectedtab === "buses" ? getRouteBus() : NewFlightget();
                  }
                  setSelectedIndex(null);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="E9width40">
          <div className="d-flex gap-4 chalisninicheno">
            <motion.div
              className="d-flex flex-column gap-4 zeel-1"
              initial={{ opacity: 1 }}
              animate={controls1}
              style={{ y: y1 }}
            >
              <img
                src={selectedtab === "buses" ? images.bus1 : images.flight1}
                className="rounded-xl object-cover h-24 md:h-32"
                style={{ width: "220px", height: "220px", borderRadius: 40 }}
              />
              <img
                src={selectedtab === "buses" ? images.bus2 : images.flight2}
                className="rounded-xl object-cover h-40 md:h-48"
                style={{ width: "220px", height: "220px", borderRadius: 40 }}
              />
              <img
                src={selectedtab === "buses" ? images.bus4 : images.flight3}
                className="rounded-xl object-cover h-32 md:h-40"
                style={{ width: "220px", height: "220px", borderRadius: 40 }}
              />
            </motion.div>

            <motion.div
              className="d-flex flex-column gap-4 zeel-2"
              initial={{ opacity: 1 }}
              animate={controls2}
              style={{ y: y2 }}
            >
              <img
                src={selectedtab === "buses" ? images.bus3 : images.flight4}
                className="rounded-xl object-cover h-24 md:h-32"
                style={{ width: "220px", height: "220px", borderRadius: 40 }}
              />
              <img
                src={images.flight5}
                className="rounded-xl object-cover h-40 md:h-48"
                style={{ width: "220px", height: "220px" }}
              />
              <img
                src={images.flight6}
                className="rounded-xl object-cover h-32 md:h-40"
                style={{ width: "220px", height: "220px" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {flight_Loading === true ? (
        <div
          style={{
            width: "100%",
            // height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <div className="loader">
            <div className="spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <>
            {selectedOption.id == 2 && return_flight_data.length !== 0 ? (
              <div className="bg-light p-2 mt-3">
                <div className="d-flex container p-0 rounded-pill overflow-hidden shadow">
                  <div
                    className={`flex-fill rounded-pill returnflighttabpill p-2 ${
                      returnflightTab === 0 ? "pillcustomClr" : ""
                    }`}
                    onClick={() => handleReturnFlightTabChange(0)}
                  >
                    {String(from || "").toUpperCase()} ---{" "}
                    {String(to || "").toUpperCase()}
                  </div>
                  <div
                    className={`flex-fill rounded-pill  returnflighttabpill p-2 ${
                      returnflightTab === 1 ? "pillcustomClr " : ""
                    }`}
                    onClick={() => handleReturnFlightTabChange(1)}
                  >
                    {String(to || "").toUpperCase()} ---
                    {String(from || "").toUpperCase()}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {returnflightTab == 0 && (
              <>
                {flight_Data?.map((item, index) => {
                  const firstSeg = item?.sg?.[0];
                  const lastSeg = item?.sg?.[item?.sg?.length - 1];
                  const departureMoment = firstSeg?.or?.dT
                    ? moment(firstSeg.or.dT)
                    : null;
                  const arrivalMoment = lastSeg?.ds?.aT
                    ? moment(lastSeg.ds.aT)
                    : null;
                  const totalMinutes =
                    departureMoment && arrivalMoment
                      ? arrivalMoment.diff(departureMoment, "minutes")
                      : firstSeg?.dr ?? 0;
                  const totalHours = Math.floor(totalMinutes / 60);
                  const totalRemainingMin = totalMinutes % 60;
                  return (
                    <>
                      <div className="flightsavailable2" key={index}>
                        <div className="row">
                          <div className="col-12 col-lg-9 justify-content-space-between">
                            <div className="align-items-center justify-content-around d-flex flex-column gap-5 gap-lg-0 flex-lg-row p-3">
                              <div className="airlinename col-12 col-lg-3">
                                <div>
                                  {(() => {
                                    const airline = item?.sg[0]?.al?.alN;

                                    return airline === "IndiGo Airlines" ||
                                      airline === "Indigo" ? (
                                      <img
                                        src={images.IndiGoAirlines_logo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Neos" ? (
                                      <img
                                        src={images.neoslogo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "SpiceJet" ? (
                                      <img
                                        src={images.spicejet}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Air India" ? (
                                      <img
                                        src={images.airindialogo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Akasa Air" ? (
                                      <img
                                        src={images.akasalogo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Etihad" ? (
                                      <img
                                        src={images.etihadlogo}
                                        style={{
                                          backgroundColor: "#fff",
                                          padding: "5px",
                                          borderRadius: "5px",
                                        }}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Vistara" ? (
                                      <img
                                        src={images.vistaralogo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "AirAsia X" ? (
                                      <img
                                        src={images.airasiax}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "AirAsia" ? (
                                      <img
                                        src={images.airasia}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Azul" ? (
                                      <img
                                        src={images.azul}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Air India Express" ? (
                                      <img
                                        src={images.Air_India_Express_logo}
                                        className="airline_logo2"
                                      />
                                    ) : (
                                      <IoAirplaneSharp
                                        size={40}
                                        color="black"
                                      />
                                    );
                                  })()}
                                </div>

                                <div className="planecomp2">
                                  {item.sg[0]?.al?.alN}
                                </div>
                              </div>
                              <div className="flight-details2 col-12 col-lg-6 justify-content-center">
                                {/* Departure (first segment) */}
                                <div className="flight-departure text-center">
                                  <h5 className="flighttime2">
                                    {moment(item?.sg[0]?.or?.dT).format(
                                      "hh:mm A"
                                    )}
                                  </h5>
                                  <h5 className="airportname2">
                                    {item?.sg[0]?.or?.aC}
                                  </h5>
                                  <p className="alldate2">
                                    {moment(item?.sg[0]?.or?.dT).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </p>
                                </div>

                                <div className="d-flex align-items-center gap-2 gap-lg-3">
                                  <span className="text-dark">From</span>
                                  <div className="from-to text-center">
                                    {/* Total journey duration = last arrival - first departure */}
                                    <h6 className="text-dark">
                                      {(() => {
                                        const departure = moment(
                                          item?.sg[0]?.or?.dT
                                        );
                                        const arrival = moment(
                                          item?.sg[item?.sg.length - 1]?.ds?.aT
                                        );
                                        const totalMinutes = arrival.diff(
                                          departure,
                                          "minutes"
                                        );
                                        return `${Math.floor(
                                          totalMinutes / 60
                                        )}h ${totalMinutes % 60}m`;
                                      })()}
                                    </h6>

                                    <img
                                      src={images.invertedviman}
                                      alt=""
                                      className="imagerouteplane"
                                    />

                                    {/* Show stops dynamically */}
                                    <h6 className="text-dark mt-1">
                                      {item?.sg.length === 1
                                        ? "Non Stop"
                                        : `${item?.sg.length - 1} Stop${
                                            item?.sg.length - 1 > 1 ? "s" : ""
                                          }`}
                                    </h6>
                                  </div>
                                  <span className="text-dark">To</span>
                                </div>

                                {/* Arrival (last segment) */}
                                <div className="flight-departure text-center">
                                  <h5 className="flighttime2">
                                    {moment(
                                      item?.sg[item?.sg.length - 1]?.ds?.aT
                                    ).format("hh:mm A")}
                                  </h5>
                                  <h5 className="airportname2">
                                    {item?.sg[item?.sg.length - 1]?.ds?.aC}
                                  </h5>
                                  <p className="alldate2">
                                    {moment(
                                      item?.sg[item?.sg.length - 1]?.ds?.aT
                                    ).format("DD-MM-YYYY")}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start my-3">
                              <div className="d-flex gap-1 mx-3">
                                <div
                                  className="clickherebtn"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target={`#flightDrawer-${index}`}
                                  aria-controls="flightDrawer"
                                  onClick={() => FareRuleGet(item?.rI)}
                                >
                                  Click here
                                </div>
                                <div className="">
                                  to know more about flight
                                </div>
                              </div>
                              <div
                                className="offcanvas offcanvas-start"
                                tabIndex="-1"
                                id={`flightDrawer-${index}`}
                                aria-labelledby={`flightDrawerLabel-${index}`}
                              >
                                <div className="offcanvas-header">
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="offcanvas-body">
                                  <div className="fs-3">Flight Details</div>
                                  <div className="fw-bold fs-5 mt-3">
                                    Departure Flight
                                  </div>

                                  <div className="container my-3">
                                    <div className="flight-cardok shadow-sm rounded">
                                      {/* Date Header */}
                                      <div className="p-2 date_divok fw-semibold border-bottom">
                                        {moment(firstSeg?.or?.dT).format(
                                          "ddd, DD MMM"
                                        )}
                                      </div>

                                      {/* Main Content */}
                                      <div className="p-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                          {/* Origin (first segment origin) */}
                                          <div className="text-center">
                                            <h4 className="text-success fw-bold m-0">
                                              {firstSeg?.or?.aC}
                                            </h4>
                                            <small className="text-muted">
                                              {firstSeg?.or?.cN}
                                            </small>
                                          </div>

                                          {/* Total Duration & Stops (calculated across full journey) */}
                                          <div className="text-center">
                                            <div className="fw-semibold">
                                              {departureMoment && arrivalMoment
                                                ? `${totalHours}h ${totalRemainingMin}m`
                                                : firstSeg?.dr
                                                ? `${Math.floor(
                                                    firstSeg.dr / 60
                                                  )}h ${firstSeg.dr % 60}m`
                                                : ""}
                                            </div>
                                            <small className="text-muted">
                                              {item?.sg?.length === 1
                                                ? "Non Stop"
                                                : `${
                                                    item?.sg?.length - 1
                                                  } Stop${
                                                    item?.sg?.length - 1 > 1
                                                      ? "s"
                                                      : ""
                                                  }`}
                                            </small>
                                          </div>

                                          {/* Destination (last segment destination) */}
                                          <div className="text-center">
                                            <h4 className="text-success fw-bold m-0">
                                              {lastSeg?.ds?.aC}
                                            </h4>
                                            <small className="text-muted">
                                              {lastSeg?.ds?.cN}
                                            </small>
                                          </div>
                                        </div>

                                        {/* Flight No + Check-in (you can list multiple legs if needed) */}
                                        <div className="d-flex justify-content-between text-muted small my-3">
                                          <div>
                                            ✈️ {firstSeg?.al?.alC}{" "}
                                            {firstSeg?.al?.fN}
                                            {item?.sg?.length > 1 && (
                                              <span className="ms-2 text-muted">
                                                +{item.sg.length - 1} more leg
                                                {item.sg.length - 1 > 1
                                                  ? "s"
                                                  : ""}
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Timeline (you already implemented mapping for this) */}
                                        <div className="timeline">
                                          {item?.sg?.map((seg, idx) => (
                                            <div key={idx}>
                                              <div className="timeline-item">
                                                <div className="fw-bold">
                                                  {moment(seg?.or?.dT).format(
                                                    "hh:mm A"
                                                  )}
                                                </div>
                                                <div>
                                                  {seg?.or?.aC} - {seg?.or?.aN}
                                                </div>
                                              </div>

                                              <div className="timeline-item my-3">
                                                <div className="text-muted">
                                                  Travel Time{" "}
                                                  {`${Math.floor(
                                                    moment
                                                      .duration(
                                                        seg?.dr,
                                                        "minutes"
                                                      )
                                                      .asHours()
                                                  )}h ${moment
                                                    .duration(
                                                      seg?.dr,
                                                      "minutes"
                                                    )
                                                    .minutes()}m`}
                                                </div>
                                              </div>

                                              <div className="timeline-item">
                                                <div className="fw-bold">
                                                  {moment(seg?.ds?.aT).format(
                                                    "hh:mm A"
                                                  )}
                                                </div>
                                                <div>
                                                  {seg?.ds?.aC} - {seg?.ds?.aN}
                                                  {seg?.ds?.tr
                                                    ? ` - ${seg.ds.tr}`
                                                    : ""}
                                                </div>
                                              </div>

                                              {idx < item.sg.length - 1 && (
                                                <div className="timeline-item my-2 ">
                                                  <span className="badge bg-warning text-dark">
                                                    Layover at {seg?.ds?.aN}{" "}
                                                    <br />(
                                                    {moment(seg?.ds?.aT).format(
                                                      "hh:mm A"
                                                    )}{" "}
                                                    →{" "}
                                                    {moment(
                                                      item.sg[idx + 1]?.or?.dT
                                                    ).format("hh:mm A")}
                                                    )
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="fw-bold fs-5 mt-3">
                                    Fare Details
                                  </div>
                                  <div className="container my-3">
                                    <div className="flight-cardok  p-2 shadow-sm rounded">
                                      <div className="d-flex align-items-center gap-2 mb-2">
                                        <div>
                                          <BsFillHandbagFill
                                            color="orangered"
                                            size={15}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            lineHeight: 1,
                                            fontSize: "0.80rem",
                                          }}
                                        >
                                          {item?.sg[0]?.cBg} Cabin bag allowance
                                        </div>
                                      </div>
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <BsFillLuggageFill
                                            color="orangered"
                                            size={15}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            lineHeight: 1,
                                            fontSize: "0.75rem",
                                          }}
                                        >
                                          {item?.sg[0]?.bg} Check-in bag
                                          allowance
                                        </div>
                                      </div>
                                      <div className="mt-3">
                                        <h6 className="fw-bold">Fare Rules</h6>
                                        {fare_rules_Loading ? (
                                          <Box sx={{ width: "100%" }}>
                                            <Skeleton
                                              variant="text"
                                              height={20}
                                            />
                                            <Skeleton
                                              variant="text"
                                              height={20}
                                            />
                                            <Skeleton
                                              variant="text"
                                              height={20}
                                            />
                                          </Box>
                                        ) : (
                                          <div
                                            style={{
                                              fontSize: "0.8rem",
                                              lineHeight: 1.4,
                                            }}
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                fare_rules[0]?.fareRuleDetail,
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-3 nanolito2 d-flex justify-content-center">
                            <div className="pricediv col-lg-3 mb-3 mb-lg-0">
                              <div className="d-flex align-items-center">
                                <FaRupeeSign size={20} color="#000" />
                                <h4 className="text-dark fw-bold dijit">
                                  {item?.fF}
                                </h4>
                              </div>

                              {login ? (
                                <div
                                  style={{
                                    cursor:
                                      selectedOption.id == 2 &&
                                      resultIndex.includes(item?.rI)
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                  onClick={() => {
                                    if (selectedOption.id == 1) {
                                      setIndex(index);
                                      setResultIndex((prev) => [
                                        ...prev,
                                        item?.rI,
                                      ]);
                                      ItineraryCreateNew(
                                        [...resultIndex, item?.rI],
                                        item
                                      );
                                    } else {
                                      if (
                                        selectedOption.id == 2 &&
                                        resultIndex.includes(item?.rI)
                                      ) {
                                      } else {
                                        setFlightData(item);
                                        setIndex(index);
                                        setResultIndex([item?.rI]);
                                        handleReturnFlightTabChange(1);
                                      }
                                    }
                                  }}
                                  className={`bookBtn2 ${
                                    selectedOption.id == 2 &&
                                    resultIndex.includes(item?.rI)
                                      ? "bg-secondary text-white cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  {itinerary_loading && index === getindex
                                    ? "Loading..."
                                    : selectedOption.id == 2
                                    ? resultIndex.includes(item?.rI)
                                      ? "Selected"
                                      : "Select"
                                    : "Book"}
                                </div>
                              ) : (
                                <Link
                                  onClick={() =>
                                    alert(
                                      "Please log in to proceed with booking."
                                    )
                                  }
                                  className="bookBtn2"
                                >
                                  Book
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flights_available_mobile">
                        <div className="d-flex justify-content-between">
                          <div className="mobile_row">
                            <div>
                              {(() => {
                                const airline = item?.sg[0]?.al?.alN;

                                return airline === "IndiGo Airlines" ||
                                  airline === "Indigo" ? (
                                  <img
                                    src={images.IndiGoAirlines_logo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Neos" ? (
                                  <img
                                    src={images.neoslogo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "SpiceJet" ? (
                                  <img
                                    src={images.spicejet}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Air India" ? (
                                  <img
                                    src={images.airindialogo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Akasa Air" ? (
                                  <img
                                    src={images.akasalogo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Etihad" ? (
                                  <img
                                    src={images.etihadlogo}
                                    style={{
                                      backgroundColor: "#fff",
                                      padding: "5px",
                                      borderRadius: "5px",
                                    }}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Vistara" ? (
                                  <img
                                    src={images.vistaralogo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "AirAsia X" ? (
                                  <img
                                    src={images.airasiax}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "AirAsia" ? (
                                  <img
                                    src={images.airasia}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Azul" ? (
                                  <img
                                    src={images.azul}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Air India Express" ? (
                                  <img
                                    src={images.Air_India_Express_logo}
                                    className="airline_logo2"
                                  />
                                ) : (
                                  <IoAirplaneSharp size={40} color="white" />
                                );
                              })()}
                            </div>
                            <div className="mob_time_cont">
                              <div className="mob_time_row">
                                <div className="mob_time text-center">
                                  {moment(item?.sg[0]?.or?.dT).format(
                                    "hh:mm A"
                                  )}
                                  <div> {item?.sg[0]?.or?.aC}</div>
                                </div>
                                <div
                                  style={{
                                    width: "50px",
                                  }}
                                >
                                  -------
                                </div>
                                <div className="mob_time text-center">
                                  {moment(
                                    item?.sg[item?.sg.length - 1]?.ds?.aT
                                  ).format("hh:mm A")}
                                  <div>
                                    {item?.sg[item?.sg.length - 1]?.ds?.aC}
                                  </div>
                                </div>
                              </div>
                              <div className="mob_time_row justify-content-between">
                                <div className="mob_city_kode">
                                  {item?.departure_time}
                                </div>
                                <div className="mob_duration">
                                  {(() => {
                                    const departure = moment(
                                      item?.sg[0]?.or?.dT
                                    );
                                    const arrival = moment(
                                      item?.sg[item?.sg.length - 1]?.ds?.aT
                                    );
                                    const totalMinutes = arrival.diff(
                                      departure,
                                      "minutes"
                                    );
                                    return `${Math.floor(totalMinutes / 60)}h ${
                                      totalMinutes % 60
                                    }m`;
                                  })()}
                                </div>
                                <div className="mob_city_kode">
                                  {item?.destination}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mob_Amount">
                            <div className="mob_rupi_icon">
                              <div>
                                <FaIndianRupeeSign size={20} />
                              </div>
                              <div className="mob_amount"> {item?.fF}</div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            borderTop: "1px solid #ccc",
                            marginTop: "1rem",
                          }}
                        />

                        <div className="mob_book_btn_main">
                          <div className="d-flex align-items-center justify-content-center justify-content-lg-start my-3">
                            {/* Info Button */}
                            <div
                              className="btn btn-outline-primary d-flex align-items-center gap-2 info-btn"
                              data-bs-toggle="offcanvas"
                              data-bs-target={`#flightDrawer-${index}`}
                              aria-controls={`flightDrawer-${index}`}
                              onClick={() => FareRuleGet(item?.rI)}
                            >
                              <BsInfoCircle size={18} />
                              <span className="fw-semibold">Flight Info</span>
                            </div>

                            {/* Offcanvas Drawer */}
                            <div
                              className="offcanvas offcanvas-start"
                              tabIndex="-1"
                              id={`flightDrawer-${index}`}
                              aria-labelledby={`flightDrawerLabel-${index}`}
                            >
                              <div className="offcanvas-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="offcanvas"
                                  aria-label="Close"
                                ></button>
                              </div>

                              <div className="offcanvas-body">
                                {/* Flight Details */}
                                <div className="fs-3">Flight Details</div>
                                <div className="fw-bold fs-5 mt-3">
                                  Departure Flight
                                </div>

                                <div className="container my-3">
                                  <div className="flight-cardok shadow-sm rounded">
                                    {/* Date Header */}
                                    <div className="p-2 date_divok fw-semibold border-bottom">
                                      {moment(firstSeg?.or?.dT).format(
                                        "ddd, DD MMM"
                                      )}
                                    </div>

                                    {/* Main Content */}
                                    <div className="p-3">
                                      <div className="d-flex justify-content-between align-items-center mb-2 flight-summary">
                                        {/* Origin */}
                                        <div className="text-center">
                                          <h4 className="text-success fw-bold m-0">
                                            {firstSeg?.or?.aC}
                                          </h4>
                                          <small className="text-muted">
                                            {firstSeg?.or?.cN}
                                          </small>
                                        </div>

                                        {/* Duration & Stops */}
                                        <div className="text-center">
                                          <div className="fw-semibold">
                                            {departureMoment && arrivalMoment
                                              ? `${totalHours}h ${totalRemainingMin}m`
                                              : firstSeg?.dr
                                              ? `${Math.floor(
                                                  firstSeg.dr / 60
                                                )}h ${firstSeg.dr % 60}m`
                                              : ""}
                                          </div>
                                          <small className="text-muted">
                                            {item?.sg?.length === 1
                                              ? "Non Stop"
                                              : `${item?.sg?.length - 1} Stop${
                                                  item?.sg?.length - 1 > 1
                                                    ? "s"
                                                    : ""
                                                }`}
                                          </small>
                                        </div>

                                        {/* Destination */}
                                        <div className="text-center">
                                          <h4 className="text-success fw-bold m-0">
                                            {lastSeg?.ds?.aC}
                                          </h4>
                                          <small className="text-muted">
                                            {lastSeg?.ds?.cN}
                                          </small>
                                        </div>
                                      </div>

                                      {/* Flight Info */}
                                      <div className="d-flex justify-content-between text-muted small my-3 flight-info">
                                        <div>
                                          ✈️ {firstSeg?.al?.alC}{" "}
                                          {firstSeg?.al?.fN}
                                          {item?.sg?.length > 1 && (
                                            <span className="ms-2 text-muted">
                                              +{item.sg.length - 1} more leg
                                              {item.sg.length - 1 > 1
                                                ? "s"
                                                : ""}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      {/* Timeline */}
                                      <div className="timeline">
                                        {item?.sg?.map((seg, idx) => (
                                          <div key={idx}>
                                            <div className="timeline-item">
                                              <div className="fw-bold">
                                                {moment(seg?.or?.dT).format(
                                                  "hh:mm A"
                                                )}
                                              </div>
                                              <div>
                                                {seg?.or?.aC} - {seg?.or?.aN}
                                              </div>
                                            </div>

                                            <div className="timeline-item my-3">
                                              <div className="text-muted">
                                                Travel Time{" "}
                                                {`${Math.floor(
                                                  moment
                                                    .duration(
                                                      seg?.dr,
                                                      "minutes"
                                                    )
                                                    .asHours()
                                                )}h ${moment
                                                  .duration(seg?.dr, "minutes")
                                                  .minutes()}m`}
                                              </div>
                                            </div>

                                            <div className="timeline-item">
                                              <div className="fw-bold">
                                                {moment(seg?.ds?.aT).format(
                                                  "hh:mm A"
                                                )}
                                              </div>
                                              <div>
                                                {seg?.ds?.aC} - {seg?.ds?.aN}
                                                {seg?.ds?.tr
                                                  ? ` - ${seg.ds.tr}`
                                                  : ""}
                                              </div>
                                            </div>

                                            {idx < item.sg.length - 1 && (
                                              <div className="timeline-item my-2">
                                                <span className="badge bg-warning text-dark">
                                                  Layover at {seg?.ds?.aN}{" "}
                                                  <br />(
                                                  {moment(seg?.ds?.aT).format(
                                                    "hh:mm A"
                                                  )}{" "}
                                                  →{" "}
                                                  {moment(
                                                    item.sg[idx + 1]?.or?.dT
                                                  ).format("hh:mm A")}
                                                  )
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Fare Details */}
                                <div className="fw-bold fs-5 mt-3">
                                  Fare Details
                                </div>
                                <div className="container my-3">
                                  <div className="flight-cardok p-2 shadow-sm rounded">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                      <BsFillHandbagFill
                                        color="orangered"
                                        size={15}
                                      />
                                      <div className="bag-text">
                                        {item?.sg[0]?.cBg} Cabin bag allowance
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                      <BsFillLuggageFill
                                        color="orangered"
                                        size={15}
                                      />
                                      <div className="bag-text">
                                        {item?.sg[0]?.bg} Check-in bag allowance
                                      </div>
                                    </div>
                                    <div className="mt-3">
                                      <h6 className="fw-bold">Fare Rules</h6>
                                      {fare_rules_Loading ? (
                                        <Box sx={{ width: "100%" }}>
                                          <Skeleton
                                            variant="text"
                                            height={20}
                                          />
                                          <Skeleton
                                            variant="text"
                                            height={20}
                                          />
                                          <Skeleton
                                            variant="text"
                                            height={20}
                                          />
                                        </Box>
                                      ) : (
                                        <div
                                          className="fare-rules-text"
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              fare_rules[0]?.fareRuleDetail,
                                          }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="mob_book_airlineNm">
                            {item.sg[0]?.al?.alN}
                          </div> */}
                          <div>
                            {login ? (
                              <Link
                                to={"/TicketBookingDetails"}
                                state={{
                                  item: item,
                                  totaltraveller: totalTravellers,
                                  adulttraveler: travellers.adult,
                                  childtraveler: travellers.child,
                                  infanttraveler: travellers.infant,
                                  ticket_id: item?.ticket_id,
                                  selected: selected,
                                  getCondition: getCondition,
                                }}
                                className="bookBtn2_mob"
                              >
                                Book
                              </Link>
                            ) : (
                              <Link
                                onClick={() =>
                                  alert(
                                    "Please log in to proceed with booking."
                                  )
                                }
                                className="bookBtn2_mob"
                              >
                                Book
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}

            {returnflightTab == 1 && (
              <>
                {return_flight_data.map((item, index) => {
                  const firstSeg = item?.sg?.[0];
                  const lastSeg = item?.sg?.[item?.sg?.length - 1];
                  const departureMoment = firstSeg?.or?.dT
                    ? moment(firstSeg.or.dT)
                    : null;
                  const arrivalMoment = lastSeg?.ds?.aT
                    ? moment(lastSeg.ds.aT)
                    : null;
                  const totalMinutes =
                    departureMoment && arrivalMoment
                      ? arrivalMoment.diff(departureMoment, "minutes")
                      : firstSeg?.dr ?? 0;
                  const totalHours = Math.floor(totalMinutes / 60);
                  const totalRemainingMin = totalMinutes % 60;
                  return (
                    <>
                      <div className="flightsavailable2">
                        <div className="row">
                          <div className="col-12 col-lg-9 justify-content-space-between">
                            <div className="align-items-center justify-content-around d-flex flex-column gap-5 gap-lg-0 flex-lg-row p-3">
                              <div className="airlinename col-12 col-lg-3">
                                <div>
                                  {(() => {
                                    const airline = item.sg[0]?.al?.alN;

                                    return airline === "IndiGo Airlines" ||
                                      airline === "Indigo" ? (
                                      <img
                                        src={images.IndiGoAirlines_logo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Neos" ? (
                                      <img
                                        src={images.neoslogo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "SpiceJet" ? (
                                      <img
                                        src={images.spicejet}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Air India" ? (
                                      <img
                                        src={images.airindialogo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Akasa Air" ? (
                                      <img
                                        src={images.akasalogo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Etihad" ? (
                                      <img
                                        src={images.etihadlogo}
                                        style={{
                                          backgroundColor: "#fff",
                                          padding: "5px",
                                          borderRadius: "5px",
                                        }}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Vistara" ? (
                                      <img
                                        src={images.vistaralogo}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "AirAsia X" ? (
                                      <img
                                        src={images.airasiax}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "AirAsia" ? (
                                      <img
                                        src={images.airasia}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Azul" ? (
                                      <img
                                        src={images.azul}
                                        className="airline_logo2"
                                      />
                                    ) : airline === "Air India Express" ? (
                                      <img
                                        src={images.Air_India_Express_logo}
                                        className="airline_logo2"
                                      />
                                    ) : (
                                      <IoAirplaneSharp
                                        size={40}
                                        color="black"
                                      />
                                    );
                                  })()}
                                </div>

                                <div className="planecomp2">
                                  {item.sg[0]?.al?.alN}
                                </div>
                              </div>
                              <div className="flight-details2 col-12 col-lg-6 justify-content-center">
                                {/* Departure (first segment) */}
                                <div className="flight-departure text-center">
                                  <h5 className="flighttime2">
                                    {moment(item?.sg[0]?.or?.dT).format(
                                      "hh:mm A"
                                    )}
                                  </h5>
                                  <h5 className="airportname2">
                                    {item?.sg[0]?.or?.aC}
                                  </h5>
                                  <p className="alldate2">
                                    {moment(item?.sg[0]?.or?.dT).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </p>
                                </div>

                                <div className="d-flex align-items-center gap-2 gap-lg-3">
                                  <span className="text-dark">From</span>
                                  <div className="from-to text-center">
                                    {/* Total journey duration = last arrival - first departure */}
                                    <h6 className="text-dark">
                                      {(() => {
                                        const departure = moment(
                                          item?.sg[0]?.or?.dT
                                        );
                                        const arrival = moment(
                                          item?.sg[item?.sg.length - 1]?.ds?.aT
                                        );
                                        const totalMinutes = arrival.diff(
                                          departure,
                                          "minutes"
                                        );
                                        return `${Math.floor(
                                          totalMinutes / 60
                                        )}h ${totalMinutes % 60}m`;
                                      })()}
                                    </h6>

                                    <img
                                      src={images.invertedviman}
                                      alt=""
                                      className="imagerouteplane"
                                    />

                                    {/* Show stops dynamically */}
                                    <h6 className="text-dark mt-1">
                                      {item?.sg.length === 1
                                        ? "Non Stop"
                                        : `${item?.sg.length - 1} Stop${
                                            item?.sg.length - 1 > 1 ? "s" : ""
                                          }`}
                                    </h6>
                                  </div>
                                  <span className="text-dark">To</span>
                                </div>

                                {/* Arrival (last segment) */}
                                <div className="flight-departure text-center">
                                  <h5 className="flighttime2">
                                    {moment(
                                      item?.sg[item?.sg.length - 1]?.ds?.aT
                                    ).format("hh:mm A")}
                                  </h5>
                                  <h5 className="airportname2">
                                    {item?.sg[item?.sg.length - 1]?.ds?.aC}
                                  </h5>
                                  <p className="alldate2">
                                    {moment(
                                      item?.sg[item?.sg.length - 1]?.ds?.aT
                                    ).format("DD-MM-YYYY")}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-start my-3">
                              <div className="d-flex gap-1 mx-3">
                                <div
                                  className="clickherebtn"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target={`#flightDrawer-${index}`}
                                  aria-controls="flightDrawer"
                                  onClick={() => FareRuleGet(item?.rI)}
                                >
                                  Click here
                                </div>
                                <div className="">
                                  to know more about flight
                                </div>
                              </div>
                              <div
                                className="offcanvas offcanvas-start"
                                tabIndex="-1"
                                id={`flightDrawer-${index}`}
                                aria-labelledby={`flightDrawerLabel-${index}`}
                              >
                                <div className="offcanvas-header">
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="offcanvas-body">
                                  <div className="fs-3">Flight Details</div>
                                  <div className="fw-bold fs-5 mt-3">
                                    Departure Flight
                                  </div>

                                  <div className="container my-3">
                                    <div className="flight-cardok shadow-sm rounded">
                                      {/* Date Header */}
                                      <div className="p-2 date_divok fw-semibold border-bottom">
                                        {moment(firstSeg?.or?.dT).format(
                                          "ddd, DD MMM"
                                        )}
                                      </div>

                                      {/* Main Content */}
                                      <div className="p-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                          {/* Origin (first segment origin) */}
                                          <div className="text-center">
                                            <h4 className="text-success fw-bold m-0">
                                              {firstSeg?.or?.aC}
                                            </h4>
                                            <small className="text-muted">
                                              {firstSeg?.or?.cN}
                                            </small>
                                          </div>

                                          {/* Total Duration & Stops (calculated across full journey) */}
                                          <div className="text-center">
                                            <div className="fw-semibold">
                                              {departureMoment && arrivalMoment
                                                ? `${totalHours}h ${totalRemainingMin}m`
                                                : firstSeg?.dr
                                                ? `${Math.floor(
                                                    firstSeg.dr / 60
                                                  )}h ${firstSeg.dr % 60}m`
                                                : ""}
                                            </div>
                                            <small className="text-muted">
                                              {item?.sg?.length === 1
                                                ? "Non Stop"
                                                : `${
                                                    item?.sg?.length - 1
                                                  } Stop${
                                                    item?.sg?.length - 1 > 1
                                                      ? "s"
                                                      : ""
                                                  }`}
                                            </small>
                                          </div>

                                          {/* Destination (last segment destination) */}
                                          <div className="text-center">
                                            <h4 className="text-success fw-bold m-0">
                                              {lastSeg?.ds?.aC}
                                            </h4>
                                            <small className="text-muted">
                                              {lastSeg?.ds?.cN}
                                            </small>
                                          </div>
                                        </div>

                                        {/* Flight No + Check-in (you can list multiple legs if needed) */}
                                        <div className="d-flex justify-content-between text-muted small my-3">
                                          <div>
                                            ✈️ {firstSeg?.al?.alC}{" "}
                                            {firstSeg?.al?.fN}
                                            {item?.sg?.length > 1 && (
                                              <span className="ms-2 text-muted">
                                                +{item.sg.length - 1} more leg
                                                {item.sg.length - 1 > 1
                                                  ? "s"
                                                  : ""}
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Timeline (you already implemented mapping for this) */}
                                        <div className="timeline">
                                          {item?.sg?.map((seg, idx) => (
                                            <div key={idx}>
                                              <div className="timeline-item">
                                                <div className="fw-bold">
                                                  {moment(seg?.or?.dT).format(
                                                    "hh:mm A"
                                                  )}
                                                </div>
                                                <div>
                                                  {seg?.or?.aC} - {seg?.or?.aN}
                                                </div>
                                              </div>

                                              <div className="timeline-item my-3">
                                                <div className="text-muted">
                                                  Travel Time{" "}
                                                  {`${Math.floor(
                                                    moment
                                                      .duration(
                                                        seg?.dr,
                                                        "minutes"
                                                      )
                                                      .asHours()
                                                  )}h ${moment
                                                    .duration(
                                                      seg?.dr,
                                                      "minutes"
                                                    )
                                                    .minutes()}m`}
                                                </div>
                                              </div>

                                              <div className="timeline-item">
                                                <div className="fw-bold">
                                                  {moment(seg?.ds?.aT).format(
                                                    "hh:mm A"
                                                  )}
                                                </div>
                                                <div>
                                                  {seg?.ds?.aC} - {seg?.ds?.aN}
                                                  {seg?.ds?.tr
                                                    ? ` - ${seg.ds.tr}`
                                                    : ""}
                                                </div>
                                              </div>

                                              {idx < item.sg.length - 1 && (
                                                <div className="timeline-item my-2 ">
                                                  <span className="badge bg-warning text-dark">
                                                    Layover at {seg?.ds?.aN}{" "}
                                                    <br />(
                                                    {moment(seg?.ds?.aT).format(
                                                      "hh:mm A"
                                                    )}{" "}
                                                    →{" "}
                                                    {moment(
                                                      item.sg[idx + 1]?.or?.dT
                                                    ).format("hh:mm A")}
                                                    )
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="fw-bold fs-5 mt-3">
                                    Fare Details
                                  </div>
                                  <div className="container my-3">
                                    <div className="flight-cardok  p-2 shadow-sm rounded">
                                      <div className="d-flex align-items-center gap-2 mb-2">
                                        <div>
                                          <BsFillHandbagFill
                                            color="orangered"
                                            size={15}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            lineHeight: 1,
                                            fontSize: "0.80rem",
                                          }}
                                        >
                                          {item?.sg[0]?.cBg} Cabin bag allowance
                                        </div>
                                      </div>
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <BsFillLuggageFill
                                            color="orangered"
                                            size={15}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            lineHeight: 1,
                                            fontSize: "0.75rem",
                                          }}
                                        >
                                          {item?.sg[0]?.bg} Check-in bag
                                          allowance
                                        </div>
                                      </div>
                                      <div className="mt-3">
                                        <h6 className="fw-bold">Fare Rules</h6>
                                        {fare_rules_Loading ? (
                                          <Box sx={{ width: "100%" }}>
                                            <Skeleton
                                              variant="text"
                                              height={20}
                                            />
                                            <Skeleton
                                              variant="text"
                                              height={20}
                                            />
                                            <Skeleton
                                              variant="text"
                                              height={20}
                                            />
                                          </Box>
                                        ) : (
                                          <div
                                            style={{
                                              fontSize: "0.8rem",
                                              lineHeight: 1.4,
                                            }}
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                fare_rules[0]?.fareRuleDetail,
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-3 nanolito2 d-flex justify-content-center">
                            <div className="pricediv col-lg-3 mb-3 mb-lg-0">
                              <div className="d-flex align-items-center">
                                <FaRupeeSign size={20} color="#000" />
                                <h4 className="text-dark fw-bold dijit">
                                  {item?.fF}
                                </h4>
                              </div>

                              {login ? (
                                <div
                                  onClick={() => {
                                    setIndex(index);
                                    setResultIndex((prev) => [
                                      ...prev,
                                      item?.rI,
                                    ]);

                                    ItineraryCreateNew(
                                      [...resultIndex, item?.rI],
                                      item
                                    );
                                  }}
                                  className="bookBtn2"
                                >
                                  {itinerary_loading && index === getindex
                                    ? "Loading..."
                                    : selectedOption.id == 2 &&
                                      return_flight_data.length !== 0
                                    ? "Select"
                                    : "Book"}
                                </div>
                              ) : (
                                <Link
                                  onClick={() =>
                                    alert(
                                      "Please log in to proceed with booking."
                                    )
                                  }
                                  className="bookBtn2"
                                >
                                  Book
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flights_available_mobile">
                        <div className="d-flex justify-content-between">
                          <div className="mobile_row">
                            <div>
                              {(() => {
                                const airline = item.sg[0]?.al?.alN;

                                return airline === "IndiGo Airlines" ||
                                  airline === "Indigo" ? (
                                  <img
                                    src={images.IndiGoAirlines_logo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Neos" ? (
                                  <img
                                    src={images.neoslogo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "SpiceJet" ? (
                                  <img
                                    src={images.spicejet}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Air India" ? (
                                  <img
                                    src={images.airindialogo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Akasa Air" ? (
                                  <img
                                    src={images.akasalogo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Etihad" ? (
                                  <img
                                    src={images.etihadlogo}
                                    style={{
                                      backgroundColor: "#fff",
                                      padding: "5px",
                                      borderRadius: "5px",
                                    }}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Vistara" ? (
                                  <img
                                    src={images.vistaralogo}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "AirAsia X" ? (
                                  <img
                                    src={images.airasiax}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "AirAsia" ? (
                                  <img
                                    src={images.airasia}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Azul" ? (
                                  <img
                                    src={images.azul}
                                    className="airline_logo2_mob"
                                  />
                                ) : airline === "Air India Express" ? (
                                  <img
                                    src={images.Air_India_Express_logo}
                                    className="airline_logo2"
                                  />
                                ) : (
                                  <IoAirplaneSharp size={40} color="white" />
                                );
                              })()}
                            </div>
                            <div className="mob_time_cont">
                              <div className="mob_time_row">
                                <div className="mob_time text-center">
                                  {moment(item?.sg[0]?.or?.dT).format(
                                    "hh:mm A"
                                  )}
                                  <div> {item?.sg[0]?.or?.aC}</div>
                                </div>
                                <div
                                  style={{
                                    width: "50px",
                                  }}
                                >
                                  -------
                                </div>
                                <div className="mob_time text-center">
                                  {moment(
                                    item?.sg[item?.sg.length - 1]?.ds?.aT
                                  ).format("hh:mm A")}
                                  <div>
                                    {item?.sg[item?.sg.length - 1]?.ds?.aC}
                                  </div>
                                </div>
                              </div>
                              <div className="mob_time_row justify-content-between">
                                <div className="mob_city_kode">
                                  {item?.departure_time}
                                </div>
                                <div className="mob_duration">
                                  {(() => {
                                    const departure = moment(
                                      item?.sg[0]?.or?.dT
                                    );
                                    const arrival = moment(
                                      item?.sg[item?.sg.length - 1]?.ds?.aT
                                    );
                                    const totalMinutes = arrival.diff(
                                      departure,
                                      "minutes"
                                    );
                                    return `${Math.floor(totalMinutes / 60)}h ${
                                      totalMinutes % 60
                                    }m`;
                                  })()}
                                </div>
                                <div className="mob_city_kode">
                                  {item?.destination}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mob_Amount">
                            <div className="mob_rupi_icon">
                              <div>
                                <FaIndianRupeeSign size={20} />
                              </div>
                              <div className="mob_amount">{item?.fF}</div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            borderTop: "1px solid #ccc",
                            marginTop: "1rem",
                          }}
                        />
                        <div className="mob_book_btn_main">
                          <div className="mob_book_airlineNm">
                            {item?.airline}
                          </div>
                          <div>
                            {login ? (
                              <Link
                                to={"/TicketBookingDetails"}
                                state={{
                                  item: item,
                                  totaltraveller: totalTravellers,
                                  adulttraveler: travellers.adult,
                                  childtraveler: travellers.child,
                                  infanttraveler: travellers.infant,
                                  ticket_id: item?.ticket_id,
                                  selected: selected,
                                  getCondition: getCondition,
                                }}
                                className="bookBtn2_mob"
                              >
                                Book
                              </Link>
                            ) : (
                              <Link
                                onClick={() =>
                                  alert(
                                    "Please log in to proceed with booking."
                                  )
                                }
                                className="bookBtn2_mob"
                              >
                                Book
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </>

          {selectedtab === "buses" && (
            <>
              <div className="bus-list">
                {route_loading ? (
                  <>
                    <div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "2rem",
                        }}
                      >
                        <div className="loader">
                          <div className="spinner"></div>
                          <p className="loading-text">Loading...</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {visibleData.length <= 0 ? (
                      <div
                        className="text-center my-3"
                        style={{
                          fontWeight: "bold",
                          color: "red",
                          fontSize: "17px",
                        }}
                      >
                        {/* There are no Buses For this Route */}
                      </div>
                    ) : (
                      <>
                        {visibleData?.map((bus, index) => (
                          <div key={index}>
                            {/* Desktop Bus Card */}
                            <div className="bus-card">
                              <div className="d-flex justify-content-between">
                                <div className="bus-card-left">
                                  <div
                                    className="bus-tag"
                                    style={{ backgroundColor: bus.tagColor }}
                                  >
                                    {bus.tag}
                                    {index + 1}
                                  </div>
                                  <div className="bus-title">Eagle Express</div>
                                  <div className="d-flex flex-row flex-lg-column">
                                    <div className="bus-type">
                                      {bus.BusTypeName}
                                    </div>
                                    <div className="bus-type">
                                      {bus.ArrangementName}
                                    </div>
                                  </div>
                                </div>
                                <div className="bus-card-middle">
                                  <div className="bus-times">
                                    <span className="bus-time">
                                      {bus.CityTime}
                                    </span>
                                    <span className="bus-arrow">—</span>
                                    <span className="bus-time">
                                      {bus.ArrivalTime}
                                    </span>
                                  </div>
                                  <div className="bus-duration">
                                    {calculateDuration(
                                      bus.CityTime,
                                      bus.ArrivalTime
                                    )}{" "}
                                    • {bus.EmptySeats} Seats
                                  </div>
                                </div>
                                <div className="bus-card-right">
                                  <div className="bus-price">
                                    ₹{bus.AcSeatRate}
                                  </div>
                                  <div className="onwards">Onwards</div>
                                </div>
                              </div>
                              <div
                                style={{
                                  border: "1px solid #eee",
                                  marginTop: "1rem",
                                }}
                              />
                              <div className="d-flex justify-content-between align-items-start">
                                <div className="bus-tabs-container">
                                  <div className="bus-tabs">
                                    {[
                                      "Amenities",
                                      "Pickup & Drops",
                                      "Policies",
                                    ].map((tab) => (
                                      <button
                                        key={tab}
                                        className={`tab-btn ${
                                          activeTabIndex === index &&
                                          activeTabName === tab
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => toggleTab(index, tab)}
                                      >
                                        {tab} <GoChevronDown />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <Link
                                  onClick={() =>
                                    getSeatArrangementBus(bus.ReferenceNumber)
                                  }
                                  to="/SeatSelcetion"
                                  state={{
                                    bus: bus,
                                    sittingType: bus.BusSeatType,
                                  }}
                                  className="view-seats"
                                >
                                  Select Seat
                                </Link>
                              </div>
                              {activeTabIndex === index && (
                                <div className="tab-content">
                                  {activeTabName === "Policies" && (
                                    <div
                                      className="accordion-body text-dark"
                                      style={{
                                        backgroundColor: "#fff9db",
                                        borderBottomLeftRadius: "0.75rem",
                                        borderBottomRightRadius: "0.75rem",
                                      }}
                                    >
                                      <ul className="mb-0 ps-3">
                                        {cancellation_policy?.map(
                                          (item, index) => {
                                            const from = parseInt(
                                              item.FromMinutes,
                                              10
                                            );
                                            const to = parseInt(
                                              item.ToMinutes,
                                              10
                                            );
                                            const refund = item.RefundPercent;

                                            let text = "";
                                            if (to === 0) {
                                              text = `Cancellations made ${
                                                from / 60
                                              } hours or more before the journey will be eligible for a ${refund}% refund.`;
                                            } else {
                                              text = `Cancellations made ${
                                                from / 60
                                              } to ${
                                                to / 60
                                              } hours before the journey will be eligible for a ${refund}% refund.`;
                                            }
                                            return <li key={index}>{text}</li>;
                                          }
                                        )}
                                        <li>
                                          Partial refunds depend on the
                                          operator’s terms.
                                        </li>
                                        <li>
                                          GST and convenience fees are
                                          non-refundable.
                                        </li>
                                        <li>
                                          For full terms, please refer to our{" "}
                                          <a
                                            href="#"
                                            className="text-decoration-underline text-dark fw-bold"
                                          >
                                            cancellation policy page
                                          </a>
                                          .
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                  {activeTabName === "Amenities" && (
                                    <div>
                                      <h5 className="fw-bold">Amenities</h5>
                                      <div className="d-flex mt-3">
                                        <div className="row w-100 align-items-center justify-content-start row-gap-3">
                                          <div className="col-3 d-flex flex-row align-items-center gap-3">
                                            <FaWifi size={25} /> <div>Wifi</div>
                                          </div>
                                          <div className="col-3 d-flex flex-row align-items-center gap-3">
                                            <IoIosBatteryCharging size={25} />
                                            <div>Charging Port</div>
                                          </div>
                                          <div className="col-3 d-flex flex-row align-items-center gap-3">
                                            <BiBlanket size={25} />{" "}
                                            <div>Blanket</div>
                                          </div>
                                          <div className="col-3 d-flex flex-row align-items-center gap-3">
                                            <FaBottleWater size={25} />
                                            <div>Water Bottle</div>
                                          </div>
                                          <div className="col-3 d-flex flex-row align-items-center gap-3">
                                            <LuLampDesk size={25} />
                                            <div>Reading Lamp</div>
                                          </div>
                                          <div className="col-3 d-flex flex-row align-items-center gap-3">
                                            <FaTv size={25} /> <div>Movie</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {activeTabName === "Pickup & Drops" && (
                                    <div className="pickup-drop">
                                      <div className="pickupdiv">
                                        <h5 className="fw-bolder">
                                          Pickup Points
                                        </h5>
                                        <ul>
                                          {parseBoardingPoints(
                                            bus.BoardingPoints
                                          ).map((point, idx) => (
                                            <li key={idx}>
                                              {point.time} - {point.name}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="dropdiv">
                                        <h5 className="fw-bolder">
                                          Drop Points
                                        </h5>
                                        <ul>
                                          {parseDroppingPoints(
                                            bus.DroppingPoints
                                          ).map((point, idx) => (
                                            <li key={idx}>
                                              {point.time} - {point.name}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Mobile Bus Card */}
                            <div className="mob-bus-card">
                              <div>
                                <div
                                  className="bus-tag"
                                  style={{ backgroundColor: bus.tagColor }}
                                >
                                  {index + 1}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div className="bus-times">
                                    <span
                                      className="bus-time"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {bus.CityTime}
                                    </span>
                                    <span className="bus-arrow">—</span>
                                    <span className="bus-time">
                                      {bus.ArrivalTime}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div className="bus-duration">
                                    {calculateDuration(
                                      bus.CityTime,
                                      bus.ArrivalTime
                                    )}{" "}
                                    • {bus.EmptySeats} Seats
                                  </div>
                                  <div>
                                    <div className="bus-price">
                                      ₹{bus.AcSeatRate}
                                    </div>
                                  </div>
                                </div>
                                <div className="bus-title">{bus.title}</div>
                                <div className="bus-type">
                                  {bus.BusTypeName}
                                </div>
                                <div className="bus-type">
                                  {bus.ArrangementName}
                                </div>
                              </div>
                              <div
                                style={{
                                  border: "1px solid #eee",
                                  marginTop: "1rem",
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <div className="mob-bus-tabs-container">
                                  <div className="mob-bus-tabs">
                                    {[
                                      "Amenities",
                                      "Pickup & Drops",
                                      "Policies",
                                    ].map((tab) => (
                                      <button
                                        key={tab}
                                        className={`mob-tab-btn ${
                                          activeTabIndex === index &&
                                          activeTabName === tab
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => toggleTab(index, tab)}
                                      >
                                        {tab}
                                      </button>
                                    ))}
                                  </div>
                                  <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ borderColor: "var(--color-orange)" }}
                                  />
                                  <Link
                                    to="/SeatSelcetion"
                                    state={{
                                      bus: bus,
                                      sittingType: bus.BusSeatType,
                                    }}
                                    className="mob-view-seats"
                                    onClick={() =>
                                      getSeatArrangementBus(bus.ReferenceNumber)
                                    }
                                  >
                                    Select Seat
                                  </Link>
                                </div>
                              </div>
                              {activeTabIndex === index && (
                                <div className="tab-content">
                                  {activeTabName === "Policies" && (
                                    <div
                                      className="accordion-body text-dark"
                                      style={{
                                        backgroundColor: "#fff9db",
                                        borderBottomLeftRadius: "0.75rem",
                                        borderBottomRightRadius: "0.75rem",
                                      }}
                                    >
                                      <ul className="mb-0 p-0">
                                        {cancellation_policy?.map(
                                          (item, index) => {
                                            const from = parseInt(
                                              item.FromMinutes,
                                              10
                                            );
                                            const to = parseInt(
                                              item.ToMinutes,
                                              10
                                            );
                                            const refund = item.RefundPercent;

                                            let text = "";
                                            if (to === 0) {
                                              text = `Cancellations made ${
                                                from / 60
                                              } hours or more before the journey will be eligible for a ${refund}% refund.`;
                                            } else {
                                              text = `Cancellations made ${
                                                from / 60
                                              } to ${
                                                to / 60
                                              } hours before the journey will be eligible for a ${refund}% refund.`;
                                            }
                                            return <li key={index}>{text}</li>;
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                  {activeTabName === "Amenities" && (
                                    <div>
                                      <h5 className="fw-bold">Amenities</h5>
                                      <p>
                                        WiFi, Charging Port, Blanket, Water
                                        Bottle
                                      </p>
                                    </div>
                                  )}
                                  {activeTabName === "Pickup & Drops" && (
                                    <div className="mob-pickup-drop">
                                      <div className="mobpickupdiv">
                                        <h5 className="fw-bolder">
                                          Pickup Points
                                        </h5>
                                        <ul style={{ paddingLeft: "0px" }}>
                                          {parseBoardingPoints(
                                            bus.BoardingPoints
                                          ).map((point, idx) => (
                                            <li key={idx}>
                                              {point.time} - {point.name}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <Divider
                                        orientation="vertical"
                                        flexItem
                                        sx={{
                                          borderColor: "var(--color-orange)",
                                        }}
                                      />
                                      <div className="mobdropdiv">
                                        <h5 className="fw-bolder">
                                          Drop Points
                                        </h5>
                                        <ul style={{ paddingLeft: "0px" }}>
                                          {parseDroppingPoints(
                                            bus.DroppingPoints
                                          ).map((point, idx) => (
                                            <li key={idx}>
                                              {point.time} - {point.name}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Show More Button */}
                        {visibleCount < route_data?.length && (
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: "1rem",
                              alignSelf: "center",
                            }}
                          >
                            <button
                              onClick={handleShowMore}
                              className="view-seats"
                            >
                              Show More
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
          {/* {selectedtab === "flights" && (
            <>
              {login == "true" ? (
                <>
                  <div className="recent-searches-wrapper">
                    <h2 className="recent_search_head">Recent Searches</h2>
                    {RecentSelection.length > 0 &&
                    RecentSelection.filter((item) =>
                      selected == 1
                        ? item?.is_return == 1
                        : item?.is_return == 0
                    ).length > 0 ? (
                      <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={20}
                        slidesPerView={4}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          768: { slidesPerView: 2 },
                          1024: { slidesPerView: 3 },
                          1540: { slidesPerView: 4 },
                        }}
                        className="recent-search-swiper"
                      >
                        {RecentSelection.filter((item) =>
                          selected == 1
                            ? item?.is_return == 1
                            : item?.is_return == 0
                        )
                          .slice(0, 5)
                          .map((item, index) => (
                            <SwiperSlide key={index}>
                              <div
                                className="search-card"
                                onClick={() => handleRecentClick(item)}
                              >
                                <div className="icon-title">
                                  <div className="circlegol2">
                                    <BiSolidPlaneAlt
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#fff",
                                      }}
                                    />
                                  </div>
                                  <span>
                                    {item.departure_city?.split(" (")[0]}{" "}
                                    <b>›</b> {item.arrival_city?.split(" (")[0]}
                                  </span>
                                </div>

                                <div className="recent_search_icon_flex">
                                  <div className="date">
                                    {item.departure_date}{" "}
                                    {item?.return_departure_date ? "›" : ""}{" "}
                                    {item.return_departure_date}
                                  </div>
                                </div>

                                <div className="recent_search_icon_flex">
                                  <div className="desc">
                                    {item.total_travelers} Traveler
                                  </div>
                                </div>

                                <div className="recent_search_icon_flex">
                                  <div className="desc">
                                    {item.is_return == 0
                                      ? "One Way"
                                      : "Round Trip"}
                                  </div>
                                </div>

                                <div className="recent_search_icon_flex recent_search_icon_flex_last">
                                  <img
                                    className="recent_search_icons"
                                    src={images.rupees}
                                    alt=""
                                  />
                                  <div className="price"></div>
                                  <b style={{ fontSize: "24px" }}>
                                    {item.price}
                                  </b>
                                  {item.oldPrice && (
                                    <span className="old-price">
                                      Was {item.price}
                                    </span>
                                  )}
                                </div>

                                <button className="search-btn">
                                  <FaSearch className="recent_search_icon" />
                                </button>
                              </div>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    ) : (
                      <div className="mt-4 text-center text-black fw-semibold">
                        {selected == 1
                          ? "Uh Oh! No Recent Searches Found for Return Trips."
                          : "Uh Oh! No Recent Searches Found for One-Way Trips."}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )} */}
        </>
      )}
    </section>
  );
};

export default HomeHero;
