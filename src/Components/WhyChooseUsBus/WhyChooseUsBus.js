import React from "react";
import "./WhyChooseUsBus.css";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaUsers, FaGooglePay } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";

const WhyChooseUsBus = () => {
  return (
    <div className="buswhychooseusmain">
      <div className="buswhychooseusheading">Why Choose Us</div>

      <div className="row">
        <div className="col-12 col-sm-6 col-md-3 p-2 d-flex align-items-center flex-column g-2">
          <div className="chooseusiconCircle">
            <RiDiscountPercentFill size={40} color="white" />
          </div>
          <div className="chooseusicontitle">Good Deal</div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 p-2 d-flex align-items-center flex-column g-2">
          <div className="chooseusiconCircle">
            <FaUsers size={40} color="white" />
          </div>
          <div className="chooseusicontitle">Happy Customers</div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 p-2 d-flex align-items-center flex-column g-2">
          <div className="chooseusiconCircle">
            <IoTicket size={40} color="white" />
          </div>
          <div className="chooseusicontitle">Easy Booking</div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 p-2 d-flex align-items-center flex-column g-2">
          <div className="chooseusiconCircle">
            <FaGooglePay size={40} color="white" />
          </div>
          <div className="chooseusicontitle">Secure Payment</div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsBus;
