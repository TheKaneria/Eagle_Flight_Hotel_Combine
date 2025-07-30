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
import { BsBusFront, BsBatteryCharging } from "react-icons/bs";
import { IoAirplaneSharp } from "react-icons/io5";
import { BiBlanket, BiSolidPlaneAlt } from "react-icons/bi";
import { LuLampDesk } from "react-icons/lu";
import { GiWaterBottle } from "react-icons/gi";
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
  get_recent_search,
  getamenities,
  getcancellationpolicy,
  getcitypair,
  getcompanylist,
  getDestination,
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
import { Navigation } from "swiper/modules";
import { useAuthContext } from "../../Context/auth_context";

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
const options = ["Return", "One-way", "Multi-city"];
const classes = ["Economy", "Business", "First"];

const HomeHero = () => {
  const animatedComponents = makeAnimated();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // const [selectedtab, setSelectedtab] = useState("buses");
  const [selectedtab, setSelectedtab] = useState(() => {
    return localStorage.getItem("selectedTab") || "buses";
  });
  const [isOpen, setIsOpen] = useState(false);
  const [mergedData, setMergedData] = useState([]);
  const [filteredFromdata, setFilteredFromData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("One-way");
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
    if (opt === "One-way") {
      setSelected(0);
      setSelectedValue("");
      setSelectedValue2("");
      setDate1(null);
      setDate2(null);
      setFrom("");
      setTo("");
      setSelectedDate(null);
      setSelectedDate2(null);
      setDefaultMonth(null);
      setDefaultMonth2(null);
      DepatureCityList(0);
      setSearchFlightList([]);
    } else if (opt === "Return") {
      setSelected(1);
      setSelectedValue("");
      setSelectedValue2("");
      setDate1(null);
      setDate2(null);
      setFrom("");
      setTo("");
      setSelectedDate(null);
      setSelectedDate2(null);
      setDefaultMonth(null);
      setDefaultMonth2(null);
      DepatureCityList(1);
      setSearchFlightList([]);
    } else {
    }

    if (opt === "Multi-city") {
      console.log("Multi-city option is disabled");
      return;
    }
    setSelectedOption(opt);
    setIsOpen(false);
  };
  const swapLocations = () => {
    const newFrom = to;
    const newTo = from;

    setFrom(newFrom);
    setTo(newTo);

    ArrivalCityList(newFrom.city_code); // use swapped `from` value

    // Use new values directly instead of waiting for state update
    getOnwardDate(newFrom.city_code, newTo.city_code);
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

  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#f7f7f7",
      border: "none",
      boxShadow: "none",
      padding: "5px 10px",
      cursor: "pointer",
      borderRadius: "10px",
      border: "1px solid #ddd",
      width: "175px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    dropdownIndicator: () => null,
    indicatorSeparator: () => null,
  };

  const [selectedClass, setSelectedClass] = useState("Economy");
  const [getDepatureCityList, setDepatureCityList] = useState([]);
  const [getDepatureCityListFilterData, setDepatureCityListFilterData] =
    useState([]);
  const [getArrivalCityList, setArrivalCityList] = useState([]);
  const [getArrivalCityListFilterData, setArrivalCityListFilterData] = useState(
    []
  );
  const [getSectorList, setSectorList] = useState([]);
  const [getOnwardDateList, setOnwardDateList] = useState([]);
  const [getReturnDateList, setReturnDateList] = useState([]);
  const [getSearchFlightList, setSearchFlightList] = useState([]);
  const [searchedfromcity, setSearchedFromcity] = useState("");
  const [bookingtokenid, setbookingtokenid] = useState("");
  const [getSearchFlightListLoading, setSearchFlightListLoading] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueCity, setSelectedValueCity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [searchTerm2, setSearchTerm2] = useState("");
  const [getDepCityCode, setDepCityCode] = useState("");
  const [getArrCityCode, setArrCityCode] = useState("");
  const [getSearchFlightListMsg, setSearchFlightListMsg] = useState("");
  const [getDirectArrCityCode, setDirectArrCityCode] = useState("");
  const [getSeachCondition, setSearchCondition] = useState(false);
  const [getSeachCondition2, setSearchCondition2] = useState(false);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [defaultMonth, setDefaultMonth] = useState("");
  const [defaultMonth2, setDefaultMonth2] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [login, SetLogin] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isViewOpen2, setIsViewOpen2] = useState(false);
  const [isViewOpen3, setIsViewOpen3] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [RecentSelection, setRecentSelection] = useState([]);
  const [lowestPrice, setLowestPrice] = useState(null);

  // console.log("SELECTED",selected);
  // console.log("getSeachCondition2", getSeachCondition2);

  // AIR IQ API State Start
  const API_KEY =
    "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OmpTMm0vUU1HVmQvelovZi81dFdwTEE9PQ==";
  // const isLocalhost = window.location.hostname === "localhost";
  // const proxy = isLocalhost ? "https://cors-anywhere.herokuapp.com/" : "";
  const proxy = "https://cors-anywhere.herokuapp.com/";

  const [getSectorListNew, setSectorListNew] = useState([]);
  const [getAvailableDate, setAvailableDate] = useState([]);
  const [getSearchFlightListData, setSearchFlightListData] = useState([]);
  const [getSearchFlightListDataCheap, setSearchFlightListDataCheap] = useState(
    []
  );
  const [getSearchFlightListDatamsg, setSearchFlightListDatamsg] = useState();
  const [getSectorListFrom, setSectorListFrom] = useState([]);
  const [getSectorListTo, setSectorListTo] = useState([]);
  const [getSectorListTo2, setSectorListTo2] = useState([]);
  const [filteredTodata, setFilteredToData] = useState([]);
  const [getCondition, setCondition] = useState();
  const [mergedDepartureList, setMergedDepartureList] = useState([]);
  const [recentSearchCondition, setRecentSearchCondition] = useState(false);
  const [depcitylistload, setdepcitylistload] = useState(false);
  const [arrcitylistload, setarrcitylistload] = useState(false);
  const [hasSwappedOnce, setHasSwappedOnce] = useState(false);
  const [sortedFlights, setsortedFlights] = useState([]);
  const [sortedCheapFlights, setsortedCheapFlights] = useState([]);
  const [fromBusId, setFromBusId] = useState();
  const [toBusId, setToBusId] = useState();

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

  const optionss = [
    { value: "cheapest-price", label: "Cheapest Price" },
    { value: "early-departure", label: "Early Departure" },
    { value: "late-departure", label: "Late Departure" },
    { value: "early-arrival", label: "Early Arrival" },
    { value: "late-arrival", label: "Late Arrival" },
  ];

  const [traveller, setTraveller] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [getCompanyId, setCompanyId] = useState();

  const sortKey = getCondition ? "price" : "per_adult_child_price";

  useEffect(() => {
    const sorted = [...getSearchFlightListData].sort(
      (a, b) => a[sortKey] - b[sortKey]
    );
    setsortedFlights(sorted);

    const sortedcheap = [...getSearchFlightListDataCheap].sort(
      (a, b) => a[sortKey] - b[sortKey]
    );

    setsortedCheapFlights(sortedcheap);
  }, [getSearchFlightListData, getSearchFlightListDataCheap]);

  useEffect(() => {
    var companyid = localStorage.getItem("companyid");
    setCompanyId(companyid);
  }, []);

  const navigate = useNavigate();

  const [getfiltercondation, setfiltercondation] = useState(false);
  const [getfilerdata, setfilterData] = useState([]);
  const [getfilerdata2, setfilterData2] = useState([]);
  const [recentswap, setrecentswap] = useState(0);

  const handleChanges = (item) => {
    console.log("sorted", sortedFlights);

    const sortFlights = (data, type, isSecondArray = false) => {
      const depDateKey = isSecondArray ? "onward_date" : "departure_date";
      const depTimeKey = isSecondArray ? "dep_time" : "departure_time";
      const arrDateKey = isSecondArray ? "arr_date" : "arival_date";
      const arrTimeKey = isSecondArray ? "arr_time" : "arival_time";

      return [...data].sort((a, b) => {
        let timeA, timeB;

        if (type === "early-departure" || type === "late-departure") {
          timeA = new Date(`${a[depDateKey]} ${a[depTimeKey]}`);
          timeB = new Date(`${b[depDateKey]} ${b[depTimeKey]}`);
        } else if (type === "early-arrival" || type === "late-arrival") {
          timeA = new Date(`${a[arrDateKey]} ${a[arrTimeKey]}`);
          timeB = new Date(`${b[arrDateKey]} ${b[arrTimeKey]}`);
        }

        return type.startsWith("early") ? timeA - timeB : timeB - timeA;
      });
    };

    if (
      item.value === "early-departure" ||
      item.value === "late-departure" ||
      item.value === "early-arrival" ||
      item.value === "late-arrival"
    ) {
      setfiltercondation(true);

      // First array sorting
      const sortedMain = sortFlights(sortedFlights, item.value, false);
      setfilterData(sortedMain);

      // Optional: If you have a second array to sort (e.g., sortedCheapFlights)
      const sortedCheap = sortFlights(sortedCheapFlights, item.value, true);
      setfilterData2(sortedCheap); // Assuming you store it in another state
    } else {
      setfiltercondation(false);
    }
  };

  const handleSelect = async (item, skipToReset = false) => {
    console.log("parth-1", JSON.stringify(item, null, 2));

    if (!item) {
      setFrom(null);
      return;
    }

    const selectedCity = item.city_name;
    const airportCode = item.airport_code ?? item.city_code;
    // const airportCode = from ? from.city_code : (item.airport_code ?? item.city_code);
    setDepCityCode(item.airport_code ?? item.city_code);
    setSelectedValue(`${selectedCity} (${airportCode})`);
    setIsDropdownOpen(false);

    // if (!skipToReset) {

    setSelectedValue2("");
    setTo(null);
    setSearchTerm2("");
    setSelectedDate(null);
    setDate1("");
    setSearchFlightListData([]);
    setSearchFlightListDataCheap([]);
    setDefaultMonth("");
    setSelectedIndex(null);
    // }

    const filteredSectors = getSectorListNew
      .filter((sector) => {
        const [originCity] = sector.Sector.split(" // ");
        return originCity.trim() === selectedCity;
      })
      .map((sector) => ({
        city_name: sector.Sector.split(" // ")[1].trim(),
        city_code: sector.Destination,
        airport_code: sector.Destination,
        airport_name: "",
      }))
      .sort((a, b) => a.city_name.localeCompare(b.city_name));

    setSectorListTo(filteredSectors);
    setCondition(1);

    const arrivalData = await ArrivalCityList(airportCode);
    SectorList(item.city_code);
    setDefaultMonth2("");
    setSelectedDate2(null);
    // if (!skipToReset) {
    setSelectedValue2(""); // again, only clear this if not skipping
    // }

    const mappedSortedCities = arrivalData?.map((city) => ({
      city_name: city.city_name,
      city_code: city.city_code,
      airport_code: city.city_code,
      airport_name: "",
    }));

    let combinedList =
      selected === 1
        ? [...mappedSortedCities]
        : [...filteredSectors, ...mappedSortedCities];

    // const combinedList = [...filteredSectors, ...mappedSortedCities];
    console.log("combinedList", combinedList);

    const groupedTo = groupBy2(combinedList, "city_name");

    const formattedGroupedCitiesTo = Object.entries(groupedTo).map(
      ([cityName, cityArray]) => {
        const item = cityArray[0];
        return {
          value: item.city_code,
          label:
            `${item.city_name} ${item.city_code} ${item.airport_name}`.trim(),
          ...item,
        };
      }
    );
    setFrom(item);
    setSectorListTo(formattedGroupedCitiesTo);
  };

  const groupBy2 = (array, key) => {
    return array.reduce((result, currentItem) => {
      const groupKey = currentItem[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentItem);
      return result;
    }, {});
  };

  const handleCounterChange = (type, change) => {
    // setSearchFlightList([]);
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
    setSearchTerm2("");
    setArrCityCode(item.city_code);
    setIsDropdownOpen2(false);

    getOnwardDate(from?.city_code || getDepCityCode, item.city_code);

    if (userRole === "2") {
      // dateAvailability(item.city_code);
      dateAvailability(from?.city_code || getDepCityCode, item.city_code);
    } else if (userRole === "3") {
      dateAvailabilitySupplier(item.city_code);
    }

    ArrivalCityList(from?.city_code || getDepCityCode);
  };

  const onChange = (date, dateString) => {
    const momentDate = moment(dateString, "ddd D/M");
    const formattedDate = momentDate.format("YYYY-MM-DD");

    setDate1(formattedDate); // Store formatted date in state
    setSelectedDate(date);

    if (selected == 1) {
      getReturnDate(formattedDate, 1, getArrCityCode); // Pass formatted date
    }
    setIsDatePickerOpen(false);
  };

  const onChange2 = (date, dateString) => {
    const formattedDate = moment(dateString, "DD-MM-YYYY").format("YYYY-MM-DD");
    setDate2(formattedDate);
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

      // console.log("futureDates",futureDates);

      const defaultmonth = futureDates[0];

      setDefaultMonth(defaultmonth);
      setAvailableMonths(months);
      console.log("defaultmonth set:", defaultmonth.format("YYYY-MM-DD"));
    } else {
      // No dates available — reset state immediately
      setDefaultMonth(null);
      setAvailableMonths([]);
      console.log("No available dates — defaultMonth cleared");
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

  useEffect(() => {
    fetchData();
  }, [selected]);

  const getlowestprice = (data) => {
    if (data && data.length > 0) {
      const prices = data
        .map((item) =>
          getCondition === 0 ? item?.price : item?.per_adult_child_price
        )
        .filter((price) => price !== undefined && price !== null);

      const minPrice = Math.min(...prices);
      setLowestPrice(minPrice);
    }
  };

  const fetchData = async () => {
    try {
      // console.log("Fetching both APIs...");
      const departureData = await DepatureCityList(selected);
      const sectorData = await GetSectorsIQ();

      // console.log("departureData123", departureData);

      mergeData(departureData, sectorData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch Departure City List
  const DepatureCityList = async (selected) => {
    const token = "4-2-3721-KRAZY-389-xnewkncBUI8";
    const publicIP = await getPublicIP();
    setdepcitylistload(true);

    if (!publicIP) {
      console.error("Unable to fetch public IP.");
      return [];
    }

    const url = "https://devapi.fareboutique.com/v1/fbapi/dep_city";
    const payload = {
      trip_type: selected,
      end_user_ip: publicIP,
      token: token,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      // console.log("12336sssada", items);

      const data = await response.json();

      if (data.replyCode === "success") {
        setdepcitylistload(false);
        // console.log("Raw Departure Data:", data.data);
        return data.data.map((item) => ({
          ...item,
          source: "getDepatureCityList", // Identify the source
        }));
      } else {
        setdepcitylistload(false);
        return [];
      }
    } catch (error) {
      setdepcitylistload(false);
      console.error("Error fetching departure city list:", error);
      return [];
    }
  };

  const GetSectorsIQ = async () => {
    const token = JSON.parse(localStorage.getItem("is_token_airiq"));
    setdepcitylistload(true);
    try {
      const response = await axios.get(
        sectorscurl,
        // proxy + "https://omairiq.azurewebsites.net/sectors",
        {
          headers: {
            "api-key": API_KEY,
            Authorization: token,
            Accept: ACCEPT_HEADER,
          },
        }
      );

      if (response.data.status === "success") {
        setdepcitylistload(false);
        const data = response.data.data;
        // console.log("Raw Sector Data:", data);
        const uniqueCitiesMap = new Map();
        data.forEach((item) => {
          if (item.Sector) {
            const sectorParts = item.Sector.split(" // ");

            const originCity = sectorParts[0].trim();
            if (!uniqueCitiesMap.has(originCity)) {
              uniqueCitiesMap.set(originCity, {
                city_name: originCity,
                airport_code: item.Origin,
                airport_name: "",
                source: "getSectorListNew", // Identify the source
              });
            }
          }
        });
        setSectorListNew(data);

        return Array.from(uniqueCitiesMap.values());
      } else {
        setdepcitylistload(false);
        return [];
      }
    } catch (error) {
      setdepcitylistload(false);
      console.error("Error fetching sectors:", error);
      return [];
    }
  };

  // Merge Both Data Sources
  const mergeData = (departureData, sectorData) => {
    if (!Array.isArray(departureData) || !Array.isArray(sectorData)) {
      console.error("Invalid data format: ", departureData, sectorData);
      return;
    }

    if (selected == 1) {
      const merged = [...departureData]; // Combine both arrays

      // Sort the merged data alphabetically by city_name
      merged.sort((a, b) => {
        if (a.city_name < b.city_name) return -1;
        if (a.city_name > b.city_name) return 1;
        return 0;
      });

      const grouped = groupBy(merged, "city_name");
      var arr = [];
      arr.push(grouped);

      const formattedGroupedCities = Object.entries(grouped).map(
        ([cityName, cityArray]) => {
          const item = cityArray[0]; // just take the first item per city
          return {
            value: item.city_code,
            label:
              `${item.city_name} ${item.airport_code} ${item.airport_name}`.trim(),
            ...item,
          };
        }
      );

      setMergedData(formattedGroupedCities);
      console.log("formattedGroupedCities123", formattedGroupedCities);
    } else {
      const merged = [...departureData, ...sectorData]; // Combine both arrays

      // Sort the merged data alphabetically by city_name
      merged.sort((a, b) => {
        if (a.city_name < b.city_name) return -1;
        if (a.city_name > b.city_name) return 1;
        return 0;
      });

      const grouped = groupBy(merged, "city_name");

      // console.log("grouped",grouped);

      var arr = [];
      arr.push(grouped);

      const formattedGroupedCities = Object.entries(grouped).map(
        ([cityName, cityArray]) => {
          const item = cityArray[0]; // just take the first item per city
          return {
            value: item.airport_code,
            label:
              `${item.city_name} ${item.airport_code} ${item.airport_name}`.trim(),
            ...item,
          };
        }
      );
      setMergedData(formattedGroupedCities);
    }
  };

  const groupBy = (array, key) => {
    return array.reduce((result, currentItem) => {
      const groupKey = currentItem[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentItem);
      return result;
    }, {});
  };

  const ArrivalCityList = async (citycode) => {
    const token = "4-2-3721-KRAZY-389-xnewkncBUI8";
    const publicIP = await getPublicIP();
    setarrcitylistload(true);
    if (!publicIP) {
      console.error("Unable to fetch public IP. Request cannot be completed.");
      return;
    }

    const url = "https://devapi.fareboutique.com/v1/fbapi/arr_city";
    const payload = {
      trip_type: selected,
      end_user_ip: publicIP,
      token: token,
      city_code: citycode,
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
        setarrcitylistload(false);
        console.log("Response from API:", data);
        const sortedCities = data.data.sort((a, b) => {
          if (a.city_name < b.city_name) return -1;
          if (a.city_name > b.city_name) return 1;
          return 0;
        });

        setSectorListTo2(sortedCities);

        return sortedCities;
        // Notification("success", "Success!", data.message);
      } else {
        setarrcitylistload(false);
        // Notification("error", "Error!", data.message || "Something went wrong");
      }
    } catch (error) {
      setarrcitylistload(false);
      console.error("Error while fetching departure city list:", error);
      // Notification("error", "Error!", "Failed to fetch data");
    }
  };

  const SectorList = async (citycode) => {
    const token = "4-2-3721-KRAZY-389-xnewkncBUI8";
    const publicIP = await getPublicIP();

    if (!publicIP) {
      console.error("Unable to fetch public IP. Request cannot be completed.");
      return;
    }

    const url = "https://devapi.fareboutique.com/v1/fbapi/sector";
    const payload = {
      trip_type: selected,
      end_user_ip: publicIP,
      token: token,
      city_code: citycode,
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
        console.log("Response from API:", data);
        setSectorList(data.data);
        // Notification("success", "Success!", data.message);
      } else {
        // Notification("error", "Error!", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error while fetching departure city list:", error);
      // Notification("error", "Error!", "Failed to fetch data");
    }
  };

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
    console.log("getArrCityCode", getArrCityCode);

    console.log("citycode zk", citycode);
    // console.log("code", code);

    const token = "4-2-3721-KRAZY-389-xnewkncBUI8";
    const publicIP = await getPublicIP();

    const formateddate = moment(citycode).format("YYYY-MM-DD");

    console.log("Formated xd", formateddate);

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

  const searchFlight = async (isRecentClick = false, recentItem = null) => {
    setSearchCondition(false);
    setSearchFlightListDataCheap([]);
    // setSearchFlightListData([]);
    // const originCode =
    // recentItem ? recentItem.departure_city_code : from?.city_code;
    const originCode = recentItem
      ? recentItem.departure_city_code
      : !from?.airport_code
      ? from?.city_code
      : from?.airport_code;
    const destinationCode = recentItem
      ? recentItem.arrival_city_code
      : to?.city_code;
    const formattedDate = moment(date1, "DD-MM-YYYY").format("YYYY-MM-DD");
    console.log("originCode", originCode);

    console.log("formattedDate", date1);

    // const formattedDate1 = moment(defaultMonth, "DD-MM-YYYY").format(
    //   "YYYY-MM-DD"
    // );
    const formateddate = moment(date2).format("YYYY-MM-DD");

    const token = "4-2-3721-KRAZY-389-xnewkncBUI8";
    const publicIP = await getPublicIP();

    const fromCity = recentItem ? recentItem.departure_city : selectedValue;
    const toCity = recentItem ? recentItem.arrival_city : selectedValue2;

    if (!publicIP) {
      console.error("Unable to fetch public IP. Request cannot be completed.");
      setSearchFlightListLoading(false);
      return;
    }
    if (!fromCity) {
      alert("Please Select From City");
      setSearchFlightListLoading(false);
      return;
    }
    if (!toCity) {
      alert("Please Select To City");
      setSearchFlightListLoading(false);
      return;
    }
    if (selected == 1 && recentItem == null) {
      console.log("selectedindex", selectedIndex);

      if (
        selected == 1 &&
        (!defaultMonth2 || (defaultMonth2 && defaultMonth2._i === ""))
      ) {
        alert("Please Select Return Date");
        setSearchFlightListLoading(false);
        return;
      } else {
        console.log("false");

        setIsDropdownOpenTravellers(false);
        setSearchFlightListLoading(true);

        const url = "https://devapi.fareboutique.com/v1/fbapi/search";

        const payload = {
          trip_type: selected,
          end_user_ip: "183.83.43.117",
          token: token,
          // dep_city_code: recentItem
          //   ? recentItem.departure_city_code
          //   : getDepCityCode,
          dep_city_code: originCode,
          // arr_city_code: recentItem
          //   ? recentItem.arrival_city_code
          //   : getArrCityCode,
          arr_city_code: destinationCode,
          onward_date: recentItem
            ? recentItem.departure_date
            : formattedDate == "Invalid date"
            ? defaultMonth._i
            : date1,
          return_date: recentItem
            ? recentItem.return_departure_date
            : formateddate == "Invalid date"
            ? defaultMonth2._i
            : formateddate,
          adult: recentItem
            ? Number(recentItem.adult_travelers)
            : travellers?.adult,
          children: recentItem
            ? Number(recentItem.child_travelers)
            : travellers?.child,
          infant: recentItem
            ? Number(recentItem.infant_travelers)
            : travellers?.infant,
        };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              // "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (data.errorCode == 0) {
            const arrdate = data.data?.arr_date || "";

            const prices = data?.data
              ?.map((item) =>
                getCondition === 0 ? item?.price : item?.per_adult_child_price
              )
              .filter((price) => price !== undefined && price !== null);

            const minPrice = Math.min(...prices);
            setLowestPrice(minPrice);
            setSearchFlightListDataCheap(data.data);

            setbookingtokenid(data.booking_token_id);
            setSearchFlightListLoading(false);
            setSearchFlightListMsg("");
            // fareQuote();
            // Notification("success", "Success!", data.message);

            if (!isRecentClick) {
              RecentSearch(
                selectedValue,
                selectedValue2,
                travellers?.adult,
                travellers?.child,
                travellers?.infant,
                totalTravellers,
                formattedDate == "Invalid date" ? defaultMonth._i : date1,
                arrdate,
                getDepCityCode,
                getArrCityCode,
                getCondition,
                selected,
                formateddate == "Invalid date"
                  ? defaultMonth2._i
                  : formateddate,
                minPrice
              );
            }
          } else if (data.errorCode == 1) {
            setSearchCondition(true);
            setSearchFlightList([]);
            setSearchFlightListMsg(data.errorMessage);
            setSearchFlightListLoading(false);
          } else {
            Notification(
              "error",
              "Error!",
              data.message || data.errorMessage || "Something went wrong"
            );
            setSearchFlightListLoading(false);
            // setSearchFlightListData([]);
          }
        } catch (error) {
          setSearchFlightListLoading(false);
          console.error("Error while fetching departure city list:", error);
          // Notification("error", "Error!", "Failed to fetch data");
        }
      }
    } else {
      console.log("false");

      if (
        selected == 1 &&
        (!recentItem?.return_departure_date ||
          recentItem?.return_departure_date == "")
      ) {
        alert("Please Select Return Date");
        setSearchFlightListLoading(false);
        return;
      } else {
        setIsDropdownOpenTravellers(false);
        setSearchFlightListLoading(true);

        const url = "https://devapi.fareboutique.com/v1/fbapi/search";

        // console.log("defaultMonth._i__",defaultMonth._i);

        const payload = {
          trip_type: selected,
          end_user_ip: "183.83.43.117",
          token: token,
          // dep_city_code: recentItem
          //   ? recentItem.departure_city_code
          //   : getDepCityCode,
          dep_city_code: originCode,
          // arr_city_code: recentItem
          //   ? recentItem.arrival_city_code
          //   : getArrCityCode,
          arr_city_code: destinationCode,
          onward_date: recentItem
            ? recentItem.departure_date
            : formattedDate == "Invalid date"
            ? defaultMonth._i
            : date1,
          return_date: recentItem
            ? recentItem.return_departure_date
            : formateddate == "Invalid date"
            ? defaultMonth2._i
            : formateddate,
          adult: recentItem
            ? Number(recentItem.adult_travelers)
            : travellers?.adult,
          children: recentItem
            ? Number(recentItem.child_travelers)
            : travellers?.child,
          infant: recentItem
            ? Number(recentItem.infant_travelers)
            : travellers?.infant,
        };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              // "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (data.errorCode == 0) {
            const arrdate = data.data?.arr_date || "";

            const prices = data?.data
              ?.map((item) =>
                getCondition === 0 ? item?.price : item?.per_adult_child_price
              )
              .filter((price) => price !== undefined && price !== null);

            const minPrice = Math.min(...prices);
            setLowestPrice(minPrice);

            setSearchFlightListDataCheap(data.data);
            setbookingtokenid(data.booking_token_id);
            setSearchFlightListLoading(false);
            setSearchFlightListMsg("");
            // fareQuote();
            // Notification("success", "Success!", data.message);

            if (!isRecentClick) {
              RecentSearch(
                selectedValue,
                selectedValue2,
                travellers?.adult,
                travellers?.child,
                travellers?.infant,
                totalTravellers,
                formattedDate == "Invalid date"
                  ? defaultMonth._i
                  : formattedDate,
                arrdate,
                getDepCityCode,
                getArrCityCode,
                getCondition,
                selected,
                formateddate == "Invalid date"
                  ? defaultMonth2._i
                  : formateddate,
                minPrice
              );
            }
          } else if (data.errorCode == 1) {
            setSearchCondition(true);
            // setSearchFlightListData([]);
            setSearchFlightListMsg(data.errorMessage);
            setSearchFlightListLoading(false);
          } else {
            Notification(
              "error",
              "Error!",
              data.message || data.errorMessage || "Something went wrong"
            );
            setSearchFlightListLoading(false);
          }
        } catch (error) {
          setSearchFlightListLoading(false);
          console.error("Error while fetching departure city list:", error);
          // Notification("error", "Error!", "Failed to fetch data");
        }
      }
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

  const fareQuote = async () => {
    const formattedDate = moment(date1, "DD-MM-YYYY").format("YYYY-MM-DD");

    const formattedDate2 = date2 ? moment(date2).format("YYYY-MM-DD") : "";
    const token = "4-2-3721-KRAZY-389-xnewkncBUI8";
    const publicIP = await getPublicIP();

    if (!publicIP) {
      console.error("Unable to fetch public IP. Request cannot be completed.");
      return;
    }

    const url = "https://devapi.fareboutique.com/v1/fbapi/fare_quote";
    const payload = {
      id: 415,
      end_user_ip: "183.83.43.117",
      token: token,
      onward_date: formattedDate,
      adult_children: travellers?.adult + travellers.child,
      infant: travellers?.infant,
      static: "0--21--354",
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
        // setSearchFlightList(data.data);
        // Notification("success", "Success!", data.message);
      } else {
        Notification("error", "Error!", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error while fetching departure city list:", error);
      // Notification("error", "Error!", "Failed to fetch data");
    }
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

    // if (item?.get_condition == 0) {
    searchFlightData(true, item);
    // } else if (item?.get_condition == 1) {
    searchFlight(true, item);
    // }
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

  const searchFlightData = async (isRecentClick = false, recentItem = null) => {
    // console.log("1111111111111");
    const originCode = recentItem
      ? recentItem.departure_city_code
      : !from?.airport_code
      ? from?.city_code
      : from?.airport_code;

    const destinationCode = recentItem
      ? recentItem.arrival_city_code
      : to?.city_code;
    console.log("originCode", originCode);

    const token = JSON.parse(localStorage.getItem("is_token_airiq"));
    const headers = new Headers(ACCEPT_HEADER1);
    headers.append("Authorization", token);

    setSearchCondition2(false);

    const formattedDate =
      date1 || moment(defaultMonth, "DD-MMM-YYYY").format("YYYY/MM/DD");

    const formattedDate1 = moment(defaultMonth, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const formateddate = moment(date2, "DD-MM-YYYY").format("YYYY-MM-DD");

    const fromCity = recentItem ? recentItem.departure_city : selectedValue;
    const toCity = recentItem ? recentItem.arrival_city : selectedValue2;

    if (!fromCity) {
      alert("Please Select From City");
      setSearchFlightListLoading(false);
      return;
    }
    if (!toCity) {
      alert("Please Select To City");
      setSearchFlightListLoading(false);
      return;
    } else {
      setIsDropdownOpenTravellers(false);
      setSearchFlightListLoading(true);
      const departureDate =
        selected == 0
          ? formattedDate
          : moment(formattedDate, "YYYY-MM-DD").format("YYYY/MM/DD");

      const payload = {
        // origin: recentItem ? recentItem.departure_city_code : getDepCityCode,
        origin: originCode,
        // destination: recentItem ? recentItem.arrival_city_code : getArrCityCode,
        destination: destinationCode,
        departure_date: recentItem ? recentItem.departure_date : departureDate,
        adult: recentItem
          ? Number(recentItem.adult_travelers)
          : travellers?.adult,
        children: recentItem
          ? Number(recentItem.child_travelers)
          : travellers?.child,
        infant: recentItem
          ? Number(recentItem.infant_travelers)
          : travellers?.infant,
      };

      console.log("getCondition11111111111111", getCondition);

      let apiUrl = "";

      if (userRole === "2") {
        // apiUrl = proxy + "https://omairiq.azurewebsites.net/search";
        apiUrl = searchcurl;
      } else if (userRole === "3") {
        // apiUrl = proxy + "https://omairiq.azurewebsites.net/suppliersearch";
        apiUrl = suppliersearchcurl;
      } else {
        console.error("Invalid selection value");
        return;
      }

      try {
        const response = await fetch(
          // proxy + "https://omairiq.azurewebsites.net/search", {
          apiUrl,
          {
            method: "POST",
            headers: headers,
            Authorization: token,
            body: JSON.stringify(payload),
            redirect: "follow",
          }
        );

        // Parse the JSON response
        const data = await response.json();

        if (data.status === "success" && data.message === "Data not found") {
          setSearchCondition2(true);
          setSearchFlightListData([]); // optional: clear existing data
          setSearchFlightListDatamsg(data.message);
          setSearchFlightListLoading(false);
        } else if (data.status === "success") {
          // Handle real data case
          const prices = data?.data
            ?.map((item) => item?.price)
            .filter((price) => price !== undefined && price !== null);

          const minPrice = Math.min(...prices);

          setSearchFlightListData(data.data);
          setbookingtokenid(data.booking_token_id);
          setSearchFlightListDatamsg(data.message);
          setSearchFlightListLoading(false);

          if (!isRecentClick) {
            RecentSearch2(
              selectedValue,
              selectedValue2,
              travellers?.adult,
              travellers?.child,
              travellers?.infant,
              totalTravellers,
              departureDate ? departureDate : selectedIndex.departure_date,
              getDepCityCode || selectedIndex.departure_city_code,
              getArrCityCode || selectedIndex.arrival_city_code,
              getCondition,
              minPrice
            );
          }
        } else {
          setSearchFlightListLoading(false);
          Notification(
            "error",
            "Error!",
            data.message || "Something went wrong"
          );
        }
      } catch (error) {
        setSearchFlightListLoading(false);
        console.error("Error while fetching departure city list:", error);
        // Notification("error", "Error!", "Failed to fetch data");
      }
    }
  };

  const RecentSearch2 = async (
    selectedValue,
    selectedValue2,
    adult,
    child,
    infant,
    totalTravellers,
    depdate,
    getDepCityCode,
    getArrCityCode,
    condition,
    lowestPrice
  ) => {
    const token = JSON.parse(localStorage.getItem("is_token"));

    const formdata = new FormData();
    await formdata.append("departure_city", selectedValue);
    await formdata.append("arrival_city", selectedValue2);
    await formdata.append("adult_travelers", adult);
    await formdata.append("child_travelers", child);
    await formdata.append("infant_travelers", infant);
    await formdata.append("total_travelers", totalTravellers);
    await formdata.append("departure_date", depdate);
    await formdata.append("departure_city_code", getDepCityCode);
    await formdata.append("arrival_city_code", getArrCityCode);
    await formdata.append("get_condition", condition);
    await formdata.append("price", lowestPrice);

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
          // console.log("resS", res);
          GetRecentSearch();
        } else {
        }
      })
      .catch((err) => {
        console.log("ERROR in recent search ", err);
      });
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

  const formattedCitiesTo = getSectorListTo.map((item) => {
    if (getCondition === 0) {
      return {
        value: item.DestinationCode,
        label: `${item.destination} (${item.DestinationCode})`,
        ...item, // retain full object for later
      };
    } else {
      return {
        value: item.city_code,
        label: `${item.city_name} ${item.airport_code} ${item.airport_name}`,
        ...item, // retain full object for later
      };
    }
  });

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
    selectedTab,
  } = useBusContext();

  // console.log("route_data", route_data);

  useEffect(() => {
    if (from_city) {
      setFrom(from_city);
      setFromBusId(from_city.CityID);
      getDestinationBus(from_city.CityID);
    } else {
      setFrom("");
      Fromcity("");
    }
    if (to_city) {
      setTo(to_city);
      setToBusId(to_city.CityID);
    } else {
      setTo("");
      Tocity("");
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
  }, []);

  useEffect(() => {
    getAmenitiesBus();
    getCityPairBus();
  }, []);

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

  const getRouteBus = async () => {
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
  const getAmenitiesBus = async () => {
    const formdata = new FormData();
    await formdata.append("type", "POST");
    await formdata.append("url", getamenities);
    await formdata.append("verifyCall", verifyCall);
    await formdata.append("companyID", getCompanyId);

    const data = await GetAmenitiesApi(formdata);

    if (data) {
      console.log("Amenities data", data);
    }
  };

  const getCityPairBus = async () => {
    const formdata = new FormData();
    await formdata.append("type", "POST");
    await formdata.append("url", getcitypair);
    await formdata.append("verifyCall", verifyCall);

    const data = await GetCityPairApi(formdata);

    if (data) {
      console.log("get city pair data", data);
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

  const parsePoints = (pointsString) => {
    if (!pointsString) return [];

    return pointsString.split("#").map((entry) => {
      const parts = entry.split("|");
      // Format: Time - Location
      return `${parts[2]} - ${parts[1]}`;
    });
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
              <div className="J_T2">
                <div className="J_T2-header">
                  <div
                    className="dropdown-wrapper"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span>{selectedOption}</span>
                    <span className="arrow">
                      <FaChevronDown />
                    </span>{" "}
                  </div>
                  {isOpen && (
                    <div className="dropdown-options">
                      {options.map((opt) => (
                        <div
                          key={opt}
                          className={`dropdown-option ${
                            opt === selectedOption ? "active" : ""
                          } ${opt === "Multi-city" ? "disabled" : ""}`}
                          onClick={() => handleSelecttripoption(opt)}
                          style={
                            opt === "Multi-city"
                              ? { cursor: "not-allowed", opacity: 0.5 }
                              : {}
                          }
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="flight-search-bar">
              <div className="from-section">
                <Select
                  value={from}
                  onChange={
                    selectedtab === "buses" ? handleSelectBus : handleSelect
                  }
                  options={selectedtab === "buses" ? source_data : mergedData}
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
                <Select
                  value={to}
                  onChange={
                    selectedtab === "buses" ? handleSelectBusTo : handleSelect2
                  }
                  options={
                    selectedtab === "buses" ? destination_data : getSectorListTo
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
                      disabledDate={disableDates}
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
                              key={classOption}
                              className={`classselekt ${
                                selectedClass === classOption ? "selected" : ""
                              }`}
                              onClick={() => setSelectedClass(classOption)}
                            >
                              {classOption}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* <button
                className="search-button"
                onClick={() => {
                  // setRecentSearchCondition(true);
                  // if (getCondition == 0) {
                  searchFlightData();
                  // setSelectedIndex(null);
                  // } else if (getCondition == 1) {
                  searchFlight();
                  setSelectedIndex(null);
                  // }
                }}
              >
                <FaSearch />
              </button> */}
              <button
                className="search-button"
                onClick={() => {
                  {
                    selectedtab === "buses" ? getRouteBus() : <></>;
                  }
                }}
              >
                <FaSearch />
              </button>
              <button
                className="search-buttonRes"
                onClick={() => {
                  {
                    selectedTab === "buses"
                      ? getRouteBus()
                      : searchFlightData();
                  }
                  // setRecentSearchCondition(true);
                  // if (getCondition == 0) {

                  setSelectedIndex(null);
                  // } else if (getCondition == 1) {
                  // searchFlight();
                  // setSelectedIndex(null);
                  // }
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

      {getSearchFlightListLoading === true ? (
        <div>
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
        </div>
      ) : (
        <>
          {getSeachCondition === true && getSeachCondition2 === true ? (
            <>
              <p className="no_flight_search_line2">No Flights Available.</p>
            </>
          ) : (
            <>
              {(getSearchFlightListData?.length > 0 ||
                getSearchFlightListDataCheap?.length > 0) && (
                <>
                  <div
                    className="flightcounter2 resp_flight_search_result"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h5 className="hero_ticket_book_resp_font_size2">
                      We have{" "}
                      <span>
                        {getSearchFlightListData?.length
                          ? getSearchFlightListData.length
                          : getSearchFlightListDataCheap.length}{" "}
                        Flight
                      </span>{" "}
                      from{" "}
                      <span>
                        {getSearchFlightListDataCheap[0]?.dep_city_code
                          ? getSearchFlightListDataCheap[0].dep_city_code
                          : getSearchFlightListData[0]?.origin}
                      </span>{" "}
                      to{" "}
                      <span>
                        {getSearchFlightListDataCheap[0]?.arr_city_code
                          ? getSearchFlightListDataCheap[0].arr_city_code
                          : getSearchFlightListData[0]?.destination}
                      </span>{" "}
                      {totalTravellers} Traveller
                    </h5>
                    <Select
                      className="resp_flight_filter"
                      options={optionss}
                      onChange={handleChanges}
                      placeholder={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <FaSort /> Flight Sort
                        </div>
                      }
                      styles={customStyles2}
                      isSearchable={false}
                    />
                  </div>
                </>
              )}

              {/* {getSeachCondition === true ? (
                <>
                  <p className="no_flight_search_line">No Flights Available.</p>
                </>
              ) : ( */}
              <>
                {getfiltercondation ? (
                  <>
                    {[...getfilerdata].map((item, index) => {
                      const calculateDuration = (departure, arrival) => {
                        const depTime = moment(departure, "HH:mm");
                        const arrTime = moment(arrival, "HH:mm");
                        const duration = moment.duration(arrTime.diff(depTime));
                        return `${Math.floor(
                          duration.asHours()
                        )}h ${duration.minutes()}m`;
                      };
                      return (
                        <>
                          <div className="flightsavailable2">
                            <div className="row">
                              <div className="col-12 col-lg-9 justify-content-space-between">
                                <div className="align-items-center justify-content-around d-flex flex-column gap-5 gap-lg-0 flex-lg-row p-3">
                                  <div className="airlinename col-12 col-lg-3">
                                    <div>
                                      {(() => {
                                        const airline = item.airline;

                                        {
                                          /* getCondition === 1
                                            ? item.airline_name
                                            : item.airline; */
                                        }

                                        return airline === "IndiGo Airlines" ||
                                          airline === "IndiGo" ? (
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
                                      {/* {getCondition == 0 ? (
                                        <>{item?.airline}</>
                                      ) : (
                                        <>{item?.airline_name}</>
                                      )} */}

                                      {item?.airline}
                                    </div>
                                  </div>
                                  <div className="flight-details2 col-12 col-lg-6 justify-content-center">
                                    <div className="flight-departure text-center">
                                      <h5 className="flighttime2">
                                        {/* {getCondition == 0 ? (
                                          <>{item?.departure_time}</>
                                        ) : (
                                          <>{item?.dep_time}</>
                                        )} */}
                                        {item?.departure_time}
                                      </h5>
                                      <h5 className="airportname2">
                                        {/* {getCondition == 0 ? (
                                          <>{item?.origin}</>
                                        ) : (
                                          <>{item?.dep_city_name}</>
                                        )} */}
                                        {item?.origin}
                                      </h5>

                                      <p className="alldate2">
                                        {/* {getCondition == 0 ? (
                                          <>
                                            {moment(
                                              item?.departure_date
                                            ).format("DD-MM-YYYY")}{" "}
                                          </>
                                        ) : (
                                          <>
                                            {moment(item?.onward_date).format(
                                              "DD-MM-YYYY"
                                            )}{" "}
                                          </>
                                        )} */}
                                        {moment(item?.departure_date).format(
                                          "DD-MM-YYYY"
                                        )}{" "}
                                      </p>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                                      <span className="text-dark">From</span>
                                      <div className="from-to text-center">
                                        <h6 className="text-dark">
                                          {/* {getCondition == 0 ? (
                                            <>
                                              {calculateDuration(
                                                item?.departure_time,
                                                item?.arival_time
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {item?.duration &&
                                                `${item.duration.split(":")[0]
                                                }h ${item.duration.split(":")[1]
                                                }min`}
                                            </>
                                          )} */}
                                          {calculateDuration(
                                            item?.departure_time,
                                            item?.arival_time
                                          )}
                                        </h6>
                                        <img
                                          src={images.invertedviman}
                                          alt=""
                                          className="imagerouteplane"
                                        />
                                        <h6 className="text-dark">
                                          {/* {getCondition == 0 ? (
                                            <>{item?.flight_route}</>
                                          ) : (
                                            <>{item?.no_of_stop} stop</>
                                          )} */}
                                          {item?.flight_route}
                                        </h6>
                                      </div>
                                      <span className="text-dark">To</span>
                                    </div>
                                    <div className="flight-departure text-center">
                                      <h5 className="flighttime2">
                                        {/* {getCondition == 0 ? (
                                          <>{item?.arival_time}</>
                                        ) : (
                                          <>{item?.arr_time}</>
                                        )} */}
                                        {item?.arival_time}
                                      </h5>
                                      <h5 className="airportname2">
                                        {/* {getCondition == 0 ? (
                                          <>{item?.destination}</>
                                        ) : (
                                          <>{item?.arr_city_name}</>
                                        )} */}
                                        {item?.destination}
                                      </h5>
                                      <p className="alldate2">
                                        {/* {getCondition == 0 ? (
                                          <>
                                            {moment(item?.arival_date).format(
                                              "DD-MM-YYYY"
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {moment(item?.arr_date).format(
                                              "DD-MM-YYYY"
                                            )}
                                          </>
                                        )} */}
                                        {moment(item?.arival_date).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {item?.return_flight_data ? (
                                  <>
                                    <div className="align-items-center justify-content-around d-flex flex-column gap-5 gap-lg-0 flex-lg-row p-3">
                                      <div className="airlinename col-12 col-lg-3">
                                        <div>
                                          {(() => {
                                            const airline =
                                              getCondition === 1
                                                ? item.airline_name
                                                : item.airline;

                                            return airline ===
                                              "IndiGo Airlines" ||
                                              airline === "IndiGo" ? (
                                              <img
                                                src={images.IndiGoAirlines_logo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Neos" ? (
                                              <img
                                                src={images.neoslogo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "SpiceJet" ? (
                                              <img
                                                src={images.spicejet}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Air India" ? (
                                              <img
                                                src={images.airindialogo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Akasa Air" ? (
                                              <img
                                                src={images.akasalogo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Etihad" ? (
                                              <img
                                                src={images.etihadlogo}
                                                style={{
                                                  backgroundColor: "#fffbdb",
                                                  padding: "5px",
                                                  borderRadius: "5px",
                                                }}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Vistara" ? (
                                              <img
                                                src={images.vistaralogo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "AirAsia X" ? (
                                              <img
                                                src={images.airasiax}
                                                className="airline_logo"
                                              />
                                            ) : airline === "AirAsia" ? (
                                              <img
                                                src={images.airasia}
                                                className="airline_logo"
                                              />
                                            ) : airline ===
                                              "Air India Express" ? (
                                              <img
                                                src={
                                                  images.Air_India_Express_logo
                                                }
                                                className="airline_logo"
                                              />
                                            ) : (
                                              <IoAirplaneSharp
                                                size={40}
                                                color="white"
                                              />
                                            );
                                          })()}
                                        </div>

                                        <div className="planecomp2">
                                          {getCondition == 0 ? (
                                            <>{item?.airline}</>
                                          ) : (
                                            <>{item?.airline_name}</>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flight-details col-12 col-lg-6 justify-content-center">
                                        <div className="flight-departure text-center">
                                          <h5 className="flighttime2">
                                            {
                                              item?.return_flight_data
                                                ?.return_dep_time
                                            }
                                          </h5>
                                          <h5 className="airportname2">
                                            {
                                              item?.return_flight_data
                                                ?.return_dep_city_name
                                            }
                                          </h5>
                                          <p className="alldate2">
                                            {moment(
                                              item?.return_flight_data
                                                ?.return_dep_date
                                            ).format("DD-MM-YYYY")}
                                          </p>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                                          <span className="text-dark">
                                            From
                                          </span>
                                          <div className="from-to text-center">
                                            <h6 className="text-dark">
                                              {`${item?.return_flight_data?.return_trip_duration}h`}
                                            </h6>
                                            <img
                                              src={images.invertedviman}
                                              alt=""
                                              className="imagerouteplane"
                                            />
                                            <h6 className="text-dark">
                                              {item?.return_no_of_stop} Stop
                                            </h6>
                                          </div>
                                          <span className="text-dark">To</span>
                                        </div>
                                        <div className="flight-departure text-center">
                                          <h5 className="flighttime2">
                                            {
                                              item?.return_flight_data
                                                ?.return_arr_time
                                            }
                                          </h5>
                                          <h5 className="airportname2">
                                            {
                                              item?.return_flight_data
                                                ?.return_arr_city_name
                                            }
                                          </h5>
                                          <p className="alldate2">
                                            {moment(
                                              item?.return_flight_data
                                                ?.return_arr_date
                                            ).format("DD-MM-YYYY")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="col-12 col-lg-3 nanolito2 d-flex justify-content-center">
                                <div className="pricediv col-lg-3 mb-3 mb-lg-0">
                                  <div className="d-flex align-items-center">
                                    <FaRupeeSign size={20} color="#000" />
                                    <h4 className="text-dark fw-bold dijit">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.price}</>
                                      ) : (
                                        <>{item?.per_adult_child_price}</>
                                      )} */}

                                      {item?.price}
                                    </h4>
                                  </div>

                                  {login ? (
                                    <Link
                                      to={"/TicketBookingDetails"}
                                      state={{
                                        item: item,
                                        totaltraveller: totalTravellers,
                                        adulttraveler: travellers.adult,
                                        childtraveler: travellers.child,
                                        infanttraveler: travellers.infant,
                                        bookingtokenid: bookingtokenid,
                                        ticket_id: item?.ticket_id,
                                        selected: selected,
                                        getCondition: item?.airline ? 0 : 1,
                                      }}
                                      className="bookBtn2"
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
                                    {
                                      /* const airline =
                                      getCondition === 1
                                        ? item.airline_name
                                        : item.airline; */
                                    }
                                    const airline = item.airline;

                                    return airline === "IndiGo Airlines" ||
                                      airline === "IndiGo" ? (
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
                                      <IoAirplaneSharp
                                        size={40}
                                        color="white"
                                      />
                                    );
                                  })()}
                                </div>
                                <div className="mob_time_cont">
                                  <div className="mob_time_row">
                                    <div className="mob_time">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.departure_time}</>
                                      ) : (
                                        <>{item?.dep_time}</>
                                      )} */}
                                      {item?.departure_time}
                                    </div>
                                    <div
                                      style={{
                                        width: "50px",
                                      }}
                                    >
                                      -------
                                    </div>
                                    <div className="mob_time">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.arival_time}</>
                                      ) : (
                                        <>{item?.arr_time}</>
                                      )} */}
                                      {item?.arival_time}
                                    </div>
                                  </div>
                                  <div className="mob_time_row justify-content-between">
                                    <div className="mob_city_kode">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.departure_time}</>
                                      ) : (
                                        <>{item?.dep_airport_code}</>
                                      )} */}
                                      {item?.departure_time}
                                    </div>
                                    <div className="mob_duration">
                                      {/* {getCondition == 0 ? (
                                        <>
                                          {calculateDuration(
                                            item?.departure_time,
                                            item?.arival_time
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {item?.duration &&
                                            `${item.duration.split(":")[0]}h ${item.duration.split(":")[1]
                                            }m`}
                                        </>
                                      )} */}
                                      {calculateDuration(
                                        item?.departure_time,
                                        item?.arival_time
                                      )}
                                    </div>
                                    <div className="mob_city_kode">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.destination}</>
                                      ) : (
                                        <>{item?.arr_city_code}</>
                                      )} */}
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
                                  <div className="mob_amount">
                                    {/* {getCondition == 0 ? (
                                      <>{item?.price}</>
                                    ) : (
                                      <>{item?.per_adult_child_price}</>
                                    )} */}
                                    {item?.price}
                                  </div>
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
                                {/* {getCondition == 0 ? (
                                  <>{item?.airline}</>
                                ) : (
                                  <>{item?.airline_name}</>
                                )} */}
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
                                      bookingtokenid: bookingtokenid,
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
                ) : (
                  <>
                    {[...sortedFlights].map((item, index) => {
                      const calculateDuration = (departure, arrival) => {
                        const depTime = moment(departure, "HH:mm");
                        const arrTime = moment(arrival, "HH:mm");
                        const duration = moment.duration(arrTime.diff(depTime));
                        return `${Math.floor(
                          duration.asHours()
                        )}h ${duration.minutes()}m`;
                      };
                      return (
                        <>
                          <div className="flightsavailable2">
                            <div className="row">
                              <div className="col-12 col-lg-9 justify-content-space-between">
                                <div className="align-items-center justify-content-around d-flex flex-column gap-5 gap-lg-0 flex-lg-row p-3">
                                  <div className="airlinename col-12 col-lg-3">
                                    <div>
                                      {(() => {
                                        const airline = item.airline;

                                        {
                                          /* getCondition === 1
                                            ? item.airline_name
                                            : item.airline; */
                                        }
                                        {
                                          /* {
                                          console.log(
                                            "airline name",
                                            item.airline
                                          );
                                        } */
                                        }
                                        return airline === "IndiGo Airlines" ||
                                          airline === "IndiGo" ? (
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
                                      {/* {getCondition == 0 ? (
                                        <>{item?.airline}</>
                                      ) : (
                                        <>{item?.airline_name}</>
                                      )} */}

                                      {item?.airline}
                                    </div>
                                  </div>
                                  <div className="flight-details2 col-12 col-lg-6 justify-content-center">
                                    <div className="flight-departure text-center">
                                      <h5 className="flighttime2">
                                        {/* {getCondition == 0 ? (
                                          <>{item?.departure_time}</>
                                        ) : (
                                          <>{item?.dep_time}</>
                                        )} */}
                                        {item?.departure_time}
                                      </h5>
                                      <h5 className="airportname2">
                                        {/* {getCondition == 0 ? (
                                          <>{item?.origin}</>
                                        ) : (
                                          <>{item?.dep_city_name}</>
                                        )} */}
                                        {item?.origin}
                                      </h5>

                                      <p className="alldate2">
                                        {/* {getCondition == 0 ? (
                                          <>
                                            {moment(
                                              item?.departure_date
                                            ).format("DD-MM-YYYY")}{" "}
                                          </>
                                        ) : (
                                          <>
                                            {moment(item?.onward_date).format(
                                              "DD-MM-YYYY"
                                            )}{" "}
                                          </>
                                        )} */}
                                        {moment(item?.departure_date).format(
                                          "DD-MM-YYYY"
                                        )}{" "}
                                      </p>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                                      <span className="text-dark">From</span>
                                      <div className="from-to text-center">
                                        <h6 className="text-dark">
                                          {/* {getCondition == 0 ? (
                                            <>
                                              {calculateDuration(
                                                item?.departure_time,
                                                item?.arival_time
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {item?.duration &&
                                                `${item.duration.split(":")[0]
                                                }h ${item.duration.split(":")[1]
                                                }min`}
                                            </>
                                          )} */}
                                          {calculateDuration(
                                            item?.departure_time,
                                            item?.arival_time
                                          )}
                                        </h6>
                                        <img
                                          src={images.invertedviman}
                                          alt=""
                                          className="imagerouteplane"
                                        />
                                        <h6 className="text-dark">
                                          {/* {getCondition == 0 ? (
                                            <>{item?.flight_route}</>
                                          ) : (
                                            <>{item?.no_of_stop} stop</>
                                          )} */}
                                          {item?.flight_route}
                                        </h6>
                                      </div>
                                      <span className="text-dark">To</span>
                                    </div>
                                    <div className="flight-departure text-center">
                                      <h5 className="flighttime2">
                                        {/* {getCondition == 0 ? (
                                          <>{item?.arival_time}</>
                                        ) : (
                                          <>{item?.arr_time}</>
                                        )} */}
                                        {item?.arival_time}
                                      </h5>
                                      <h5 className="airportname2">
                                        {/* {getCondition == 0 ? (
                                          <>{item?.destination}</>
                                        ) : (
                                          <>{item?.arr_city_name}</>
                                        )} */}
                                        {item?.destination}
                                      </h5>
                                      <p className="alldate2">
                                        {/* {getCondition == 0 ? (
                                          <>
                                            {moment(item?.arival_date).format(
                                              "DD-MM-YYYY"
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {moment(item?.arr_date).format(
                                              "DD-MM-YYYY"
                                            )}
                                          </>
                                        )} */}
                                        {moment(item?.arival_date).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {item?.return_flight_data ? (
                                  <>
                                    <div className="align-items-center justify-content-around d-flex flex-column gap-5 gap-lg-0 flex-lg-row p-3">
                                      <div className="airlinename col-12 col-lg-3">
                                        <div>
                                          {(() => {
                                            const airline =
                                              getCondition === 1
                                                ? item.airline_name
                                                : item.airline;

                                            return airline ===
                                              "IndiGo Airlines" ||
                                              airline === "IndiGo" ? (
                                              <img
                                                src={images.IndiGoAirlines_logo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Neos" ? (
                                              <img
                                                src={images.neoslogo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "SpiceJet" ? (
                                              <img
                                                src={images.spicejet}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Air India" ? (
                                              <img
                                                src={images.airindialogo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Akasa Air" ? (
                                              <img
                                                src={images.akasalogo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Etihad" ? (
                                              <img
                                                src={images.etihadlogo}
                                                style={{
                                                  backgroundColor: "#fffbdb",
                                                  padding: "5px",
                                                  borderRadius: "5px",
                                                }}
                                                className="airline_logo"
                                              />
                                            ) : airline === "Vistara" ? (
                                              <img
                                                src={images.vistaralogo}
                                                className="airline_logo"
                                              />
                                            ) : airline === "AirAsia X" ? (
                                              <img
                                                src={images.airasiax}
                                                className="airline_logo"
                                              />
                                            ) : airline === "AirAsia" ? (
                                              <img
                                                src={images.airasia}
                                                className="airline_logo"
                                              />
                                            ) : airline ===
                                              "Air India Express" ? (
                                              <img
                                                src={
                                                  images.Air_India_Express_logo
                                                }
                                                className="airline_logo"
                                              />
                                            ) : (
                                              <IoAirplaneSharp
                                                size={40}
                                                color="white"
                                              />
                                            );
                                          })()}
                                        </div>

                                        <div className="planecomp2">
                                          {getCondition == 0 ? (
                                            <>{item?.airline}</>
                                          ) : (
                                            <>{item?.airline_name}</>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flight-details col-12 col-lg-6 justify-content-center">
                                        <div className="flight-departure text-center">
                                          <h5 className="flighttime2">
                                            {
                                              item?.return_flight_data
                                                ?.return_dep_time
                                            }
                                          </h5>
                                          <h5 className="airportname2">
                                            {
                                              item?.return_flight_data
                                                ?.return_dep_city_name
                                            }
                                          </h5>
                                          <p className="alldate2">
                                            {moment(
                                              item?.return_flight_data
                                                ?.return_dep_date
                                            ).format("DD-MM-YYYY")}
                                          </p>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                                          <span className="text-dark">
                                            From
                                          </span>
                                          <div className="from-to text-center">
                                            <h6 className="text-dark">
                                              {`${item?.return_flight_data?.return_trip_duration}h`}
                                            </h6>
                                            <img
                                              src={images.invertedviman}
                                              alt=""
                                              className="imagerouteplane"
                                            />
                                            <h6 className="text-dark">
                                              {item?.return_no_of_stop} Stop
                                            </h6>
                                          </div>
                                          <span className="text-dark">To</span>
                                        </div>
                                        <div className="flight-departure text-center">
                                          <h5 className="flighttime2">
                                            {
                                              item?.return_flight_data
                                                ?.return_arr_time
                                            }
                                          </h5>
                                          <h5 className="airportname2">
                                            {
                                              item?.return_flight_data
                                                ?.return_arr_city_name
                                            }
                                          </h5>
                                          <p className="alldate2">
                                            {moment(
                                              item?.return_flight_data
                                                ?.return_arr_date
                                            ).format("DD-MM-YYYY")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="col-12 col-lg-3 nanolito2 d-flex justify-content-center">
                                <div className="pricediv col-lg-3 mb-3 mb-lg-0">
                                  <div className="d-flex align-items-center">
                                    <FaRupeeSign size={20} color="#000" />
                                    <h4 className="text-dark fw-bold dijit">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.price}</>
                                      ) : (
                                        <>{item?.per_adult_child_price}</>
                                      )} */}

                                      {item?.price}
                                    </h4>
                                  </div>

                                  {login ? (
                                    <Link
                                      to={"/TicketBookingDetails"}
                                      state={{
                                        item: item,
                                        totaltraveller: totalTravellers,
                                        adulttraveler: travellers.adult,
                                        childtraveler: travellers.child,
                                        infanttraveler: travellers.infant,
                                        bookingtokenid: bookingtokenid,
                                        ticket_id: item?.ticket_id,
                                        selected: selected,
                                        getCondition: item?.airline ? 0 : 1,
                                      }}
                                      className="bookBtn2"
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
                                    {
                                      /* const airline =
                                      getCondition === 1
                                        ? item.airline_name
                                        : item.airline; */
                                    }
                                    const airline = item.airline;

                                    return airline === "IndiGo Airlines" ||
                                      airline === "IndiGo" ? (
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
                                      <IoAirplaneSharp
                                        size={40}
                                        color="white"
                                      />
                                    );
                                  })()}
                                </div>
                                <div className="mob_time_cont">
                                  <div className="mob_time_row">
                                    <div className="mob_time">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.departure_time}</>
                                      ) : (
                                        <>{item?.dep_time}</>
                                      )} */}
                                      {item?.departure_time}
                                    </div>
                                    <div
                                      style={{
                                        width: "50px",
                                      }}
                                    >
                                      -------
                                    </div>
                                    <div className="mob_time">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.arival_time}</>
                                      ) : (
                                        <>{item?.arr_time}</>
                                      )} */}
                                      {item?.arival_time}
                                    </div>
                                  </div>
                                  <div className="mob_time_row justify-content-between">
                                    <div className="mob_city_kode">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.departure_time}</>
                                      ) : (
                                        <>{item?.dep_airport_code}</>
                                      )} */}
                                      {item?.departure_time}
                                    </div>
                                    <div className="mob_duration">
                                      {/* {getCondition == 0 ? (
                                        <>
                                          {calculateDuration(
                                            item?.departure_time,
                                            item?.arival_time
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {item?.duration &&
                                            `${item.duration.split(":")[0]}h ${item.duration.split(":")[1]
                                            }m`}
                                        </>
                                      )} */}
                                      {calculateDuration(
                                        item?.departure_time,
                                        item?.arival_time
                                      )}
                                    </div>
                                    <div className="mob_city_kode">
                                      {/* {getCondition == 0 ? (
                                        <>{item?.destination}</>
                                      ) : (
                                        <>{item?.arr_city_code}</>
                                      )} */}
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
                                  <div className="mob_amount">
                                    {/* {getCondition == 0 ? (
                                      <>{item?.price}</>
                                    ) : (
                                      <>{item?.per_adult_child_price}</>
                                    )} */}
                                    {item?.price}
                                  </div>
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
                                {/* {getCondition == 0 ? (
                                  <>{item?.airline}</>
                                ) : (
                                  <>{item?.airline_name}</>
                                )} */}
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
                                      bookingtokenid: bookingtokenid,
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

                <>
                  {[...sortedCheapFlights].map((item, index) => {
                    const calculateDuration = (departure, arrival) => {
                      const depTime = moment(departure, "HH:mm");
                      const arrTime = moment(arrival, "HH:mm");
                      const duration = moment.duration(arrTime.diff(depTime));
                      return `${Math.floor(
                        duration.asHours()
                      )}h ${duration.minutes()}m`;
                    };
                    return (
                      <>
                        <div className="flightsavailable2">
                          <div className="row">
                            <div className="col-12 col-lg-9 justify-content-space-between">
                              <div className="align-items-center justify-content-around d-flex flex-column gap-5 gap-lg-0 flex-lg-row p-3">
                                <div className="airlinename col-12 col-lg-3">
                                  <div>
                                    {(() => {
                                      const airline =
                                        getCondition === 1
                                          ? item.airline_name
                                          : item.airline;

                                      return airline === "IndiGo Airlines" ||
                                        airline === "IndiGo" ? (
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
                                          color="white"
                                        />
                                      );
                                    })()}
                                  </div>

                                  <div className="planecomp2">
                                    {getCondition == 0 ? (
                                      <>{item?.airline}</>
                                    ) : (
                                      <>{item?.airline_name}</>
                                    )}
                                  </div>
                                </div>
                                <div className="flight-details2 col-12 col-lg-6 justify-content-center">
                                  <div className="flight-departure text-center">
                                    <h5 className="flighttime2">
                                      {getCondition == 0 ? (
                                        <>{item?.departure_time}</>
                                      ) : (
                                        <>{item?.dep_time}</>
                                      )}
                                    </h5>
                                    <h5 className="airportname2">
                                      {getCondition == 0 ? (
                                        <>{item?.origin}</>
                                      ) : (
                                        <>{item?.dep_city_name}</>
                                      )}
                                    </h5>

                                    <p className="alldate2">
                                      {getCondition == 0 ? (
                                        <>
                                          {moment(item?.departure_date).format(
                                            "DD-MM-YYYY"
                                          )}{" "}
                                        </>
                                      ) : (
                                        <>
                                          {moment(item?.onward_date).format(
                                            "DD-MM-YYYY"
                                          )}{" "}
                                        </>
                                      )}
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center gap-2 gap-lg-3">
                                    <span className="text-dark">From</span>
                                    <div className="from-to text-center">
                                      <h6 className="text-dark">
                                        {getCondition == 0 ? (
                                          <>
                                            {calculateDuration(
                                              item?.departure_time,
                                              item?.arival_time
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {item?.duration &&
                                              `${
                                                item.duration.split(":")[0]
                                              }h ${
                                                item.duration.split(":")[1]
                                              }min`}
                                          </>
                                        )}
                                      </h6>
                                      <img
                                        src={images.invertedviman}
                                        alt=""
                                        className="imagerouteplane"
                                      />
                                      <h6 className="text-dark">
                                        {getCondition == 0 ? (
                                          <>{item?.flight_route}</>
                                        ) : (
                                          <>{item?.no_of_stop} stop</>
                                        )}
                                      </h6>
                                    </div>
                                    <span className="text-dark">To</span>
                                  </div>
                                  <div className="flight-departure text-center">
                                    <h5 className="flighttime2">
                                      {getCondition == 0 ? (
                                        <>{item?.arival_time}</>
                                      ) : (
                                        <>{item?.arr_time}</>
                                      )}
                                    </h5>
                                    <h5 className="airportname2">
                                      {getCondition == 0 ? (
                                        <>{item?.destination}</>
                                      ) : (
                                        <>{item?.arr_city_name}</>
                                      )}
                                    </h5>
                                    <p className="alldate2">
                                      {getCondition == 0 ? (
                                        <>
                                          {moment(item?.arival_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {moment(item?.arr_date).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {item?.return_flight_data ? (
                                <>
                                  <div className="align-items-center justify-content-around d-flex flex-column gap-5 gap-lg-0 flex-lg-row p-3">
                                    <div className="airlinename col-12 col-lg-3">
                                      <div>
                                        {(() => {
                                          const airline =
                                            getCondition === 1
                                              ? item.airline_name
                                              : item.airline;

                                          return airline ===
                                            "IndiGo Airlines" ||
                                            airline === "IndiGo" ? (
                                            <img
                                              src={images.IndiGoAirlines_logo}
                                              className="airline_logo"
                                            />
                                          ) : airline === "Neos" ? (
                                            <img
                                              src={images.neoslogo}
                                              className="airline_logo"
                                            />
                                          ) : airline === "SpiceJet" ? (
                                            <img
                                              src={images.spicejet}
                                              className="airline_logo"
                                            />
                                          ) : airline === "Air India" ? (
                                            <img
                                              src={images.airindialogo}
                                              className="airline_logo"
                                            />
                                          ) : airline === "Akasa Air" ? (
                                            <img
                                              src={images.akasalogo}
                                              className="airline_logo"
                                            />
                                          ) : airline === "Etihad" ? (
                                            <img
                                              src={images.etihadlogo}
                                              style={{
                                                backgroundColor: "#fffbdb",
                                                padding: "5px",
                                                borderRadius: "5px",
                                              }}
                                              className="airline_logo"
                                            />
                                          ) : airline === "Vistara" ? (
                                            <img
                                              src={images.vistaralogo}
                                              className="airline_logo"
                                            />
                                          ) : airline === "AirAsia X" ? (
                                            <img
                                              src={images.airasiax}
                                              className="airline_logo"
                                            />
                                          ) : airline === "AirAsia" ? (
                                            <img
                                              src={images.airasia}
                                              className="airline_logo"
                                            />
                                          ) : airline ===
                                            "Air India Express" ? (
                                            <img
                                              src={
                                                images.Air_India_Express_logo
                                              }
                                              className="airline_logo"
                                            />
                                          ) : (
                                            <IoAirplaneSharp
                                              size={40}
                                              color="white"
                                            />
                                          );
                                        })()}
                                      </div>

                                      <div className="planecomp2">
                                        {getCondition == 0 ? (
                                          <>{item?.airline}</>
                                        ) : (
                                          <>{item?.airline_name}</>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flight-details col-12 col-lg-6 justify-content-center">
                                      <div className="flight-departure text-center">
                                        <h5 className="flighttime2">
                                          {
                                            item?.return_flight_data
                                              ?.return_dep_time
                                          }
                                        </h5>
                                        <h5 className="airportname2">
                                          {
                                            item?.return_flight_data
                                              ?.return_dep_city_name
                                          }
                                        </h5>
                                        <p className="alldate2">
                                          {moment(
                                            item?.return_flight_data
                                              ?.return_dep_date
                                          ).format("DD-MM-YYYY")}
                                        </p>
                                      </div>
                                      <div className="d-flex align-items-center gap-2 gap-lg-3">
                                        <span className="text-dark">From</span>
                                        <div className="from-to text-center">
                                          <h6 className="text-dark">
                                            {`${item?.return_flight_data?.return_trip_duration}h`}
                                          </h6>
                                          <img
                                            src={images.invertedviman}
                                            alt=""
                                            className="imagerouteplane"
                                          />
                                          <h6 className="text-dark">
                                            {item?.return_no_of_stop} Stop
                                          </h6>
                                        </div>
                                        <span className="text-dark">To</span>
                                      </div>
                                      <div className="flight-departure text-center">
                                        <h5 className="flighttime2">
                                          {
                                            item?.return_flight_data
                                              ?.return_arr_time
                                          }
                                        </h5>
                                        <h5 className="airportname2">
                                          {
                                            item?.return_flight_data
                                              ?.return_arr_city_name
                                          }
                                        </h5>
                                        <p className="alldate2">
                                          {moment(
                                            item?.return_flight_data
                                              ?.return_arr_date
                                          ).format("DD-MM-YYYY")}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-12 col-lg-3 nanolito2 d-flex justify-content-center">
                              <div className="pricediv col-lg-3 mb-3 mb-lg-0">
                                <div className="d-flex align-items-center">
                                  <FaRupeeSign size={20} color="#000" />
                                  <h4 className="text-dark fw-bold dijit">
                                    {getCondition == 0 ? (
                                      <>{item?.price}</>
                                    ) : (
                                      <>{item?.per_adult_child_price}</>
                                    )}
                                  </h4>
                                </div>

                                {login ? (
                                  <Link
                                    to={"/TicketBookingDetails"}
                                    state={{
                                      item: item,
                                      totaltraveller: totalTravellers,
                                      adulttraveler: travellers.adult,
                                      childtraveler: travellers.child,
                                      infanttraveler: travellers.infant,
                                      bookingtokenid: bookingtokenid,
                                      ticket_id: item?.ticket_id,
                                      selected: selected,
                                      getCondition: getCondition,
                                    }}
                                    className="bookBtn2"
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
                                  {
                                    /* const airline =
                                    getCondition === 1
                                      ? item.airline_name
                                      : item.airline; */
                                  }
                                  const airline = item.airline;

                                  return airline === "IndiGo Airlines" ||
                                    airline === "IndiGo" ? (
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
                                      className="airline_logo2_mob"
                                    />
                                  ) : (
                                    <IoAirplaneSharp size={40} color="white" />
                                  );
                                })()}
                              </div>
                              <div className="mob_time_cont">
                                <div className="mob_time_row">
                                  <div className="mob_time">
                                    {/* {getCondition == 0 ? (
                                      <>{item?.departure_time}</>
                                    ) : (
                                      <>{item?.dep_time}</>
                                    )} */}
                                    {item?.departure_time}
                                  </div>
                                  <div
                                    style={{
                                      width: "50px",
                                    }}
                                  >
                                    -------
                                  </div>
                                  <div className="mob_time">
                                    {/* {getCondition == 0 ? (
                                      <>{item?.arival_time}</>
                                    ) : (
                                      <>{item?.arr_time}</>
                                    )} */}
                                    {item?.arival_time}
                                  </div>
                                </div>
                                <div className="mob_time_row justify-content-between">
                                  <div className="mob_city_kode">
                                    {/* {getCondition == 0 ? (
                                      <>{item?.departure_time}</>
                                    ) : (
                                      <>{item?.dep_airport_code}</>
                                    )} */}
                                    {item?.departure_time}
                                  </div>
                                  <div className="mob_duration">
                                    {/* {getCondition == 0 ? (
                                      <>
                                        {calculateDuration(
                                          item?.departure_time,
                                          item?.arival_time
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {item?.duration &&
                                          `${item.duration.split(":")[0]}h ${item.duration.split(":")[1]
                                          }m`}
                                      </>
                                    )} */}
                                    {calculateDuration(
                                      item?.departure_time,
                                      item?.arival_time
                                    )}
                                  </div>
                                  <div className="mob_city_kode">
                                    {/* {getCondition == 0 ? (
                                      <>{item?.destination}</>
                                    ) : (
                                      <>{item?.arr_city_code}</>
                                    )} */}
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
                                <div className="mob_amount">
                                  {/* {getCondition == 0 ? (
                                    <>{item?.price}</>
                                  ) : (
                                    <>{item?.per_adult_child_price}</>
                                  )} */}
                                  {item?.price}
                                </div>
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
                              {/* {getCondition == 0 ? (
                                <>{item?.airline}</>
                              ) : (
                                <>{item?.airline_name}</>
                              )} */}
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
                                    bookingtokenid: bookingtokenid,
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
              </>

              {/* )} */}
            </>
          )}
          {selectedtab === "buses" && (
            <>
              <div className="bus-list">
                {route_loading ? (
                  <>
                    <div>
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
                    </div>
                  </>
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
                                {index}
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
                                <span className="bus-time">{bus.CityTime}</span>
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
                              <div className="bus-price">₹{bus.AcSeatRate}</div>
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
                              state={{ bus: bus, sittingType: bus.BusSeatType }}
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
                                    {cancellation_policy?.map((item, index) => {
                                      const from = parseInt(
                                        item.FromMinutes,
                                        10
                                      );
                                      const to = parseInt(item.ToMinutes, 10);
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
                                    })}
                                    <li>
                                      Partial refunds depend on the operator’s
                                      terms.
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
                                    <h5 className="fw-bolder">Pickup Points</h5>
                                    <ul>
                                      <li>03:00 - Greenland Chokdi</li>
                                      <li>03:15 - Gondal Chowkdi</li>
                                    </ul>
                                  </div>
                                  <div className="dropdiv">
                                    <h5 className="fw-bolder">Drop Points</h5>
                                    <ul>
                                      <li>06:15 - Air Port, Porbandar</li>
                                      <li>06:20 - Narshan Tekri</li>
                                      <li>06:25 - Kamla Baug</li>
                                      <li>06:30 - M.G Road</li>
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
                              {bus.tag}
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
                              <div>
                                <div className="bus-rating">
                                  <span className="rating-star">
                                    ★ {bus.rating}
                                  </span>
                                </div>
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
                                • {bus.EmptySeats}
                              </div>
                              <div>
                                <div className="bus-price">
                                  ₹{bus.AcSeatRate}
                                </div>
                              </div>
                            </div>
                            <div className="bus-title">{bus.title}</div>
                            <div className="bus-type">{bus.BusTypeName}</div>
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
                                  <ul className="mb-0 ps-3">
                                    {cancellation_policy?.map((item, index) => {
                                      const from = parseInt(
                                        item.FromMinutes,
                                        10
                                      );
                                      const to = parseInt(item.ToMinutes, 10);
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
                                    })}
                                    <li>
                                      Partial refunds depend on the operator’s
                                      terms.
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
                                        cancellation policy pagesss
                                      </a>
                                      .
                                    </li>
                                  </ul>
                                </div>
                              )}
                              {activeTabName === "Amenities" && (
                                <div>
                                  <h5 className="fw-bold">Amenities</h5>
                                  <p>
                                    WiFi, Charging Port, Blanket, Water Bottle
                                  </p>
                                </div>
                              )}
                              {activeTabName === "Pickup & Drops" && (
                                <div className="mob-pickup-drop">
                                  <div className="mobpickupdiv">
                                    <h5 className="fw-bolder">Pickup Points</h5>
                                    <ul style={{ paddingLeft: "0px" }}>
                                      <li>03:00 - Greenland Chokdi</li>
                                      <li>03:15 - Gondal Chowkdi</li>
                                    </ul>
                                  </div>
                                  <div className="mobdropdiv">
                                    <h5 className="fw-bolder">Drop Points</h5>
                                    <ul style={{ paddingLeft: "0px" }}>
                                      <li>06:15 - Air Port, Porbandar</li>
                                      <li>06:20 - Narshan Tekri</li>
                                      <li>06:25 - Kamla Baug</li>
                                      <li>06:30 - M.G Road</li>
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
                        <button onClick={handleShowMore} className="view-seats">
                          Show More
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {selectedtab === "flights" && (
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
                                  {/* <img className="recent_search_icons" src={images.calender} alt="" /> */}
                                  <div className="date">
                                    {item.departure_date}{" "}
                                    {item?.return_departure_date ? "›" : ""}{" "}
                                    {item.return_departure_date}
                                  </div>
                                </div>

                                <div className="recent_search_icon_flex">
                                  {/* <img className="recent_search_icons" src={images.traveler} alt="" /> */}
                                  <div className="desc">
                                    {item.total_travelers} Traveler
                                  </div>
                                </div>

                                <div className="recent_search_icon_flex">
                                  {/* <img className="recent_search_icons" src={images.wmremovetransformed} alt="" /> */}
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
          )}
        </>
      )}
    </section>
  );
};

export default HomeHero;
