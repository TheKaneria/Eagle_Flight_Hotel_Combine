import React, { useEffect, useRef, useState } from "react";
import "./ViewBookingBus.css";
import { Helmet } from "react-helmet";
import PathHero from "../../Components/PathHeroComponent/PathHero";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BsBusFront } from "react-icons/bs";
import { IoBus } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiGmail } from "react-icons/si";

const ViewBookingBus = () => {
  const [viewopen, setViewopen] = useState(true);
  const [viewopen2, setViewopen2] = useState(true);
  const invoiceRef = useRef(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const toggleview = () => {
    setViewopen(!viewopen);
  };

  const toggleview2 = () => {
    setViewopen2(!viewopen2);
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | View Booking</title>
      </Helmet>
      {/* <PathHero name={"View Booking"} /> */}
      <section className="mt-4">
        <div className="container-fluid p-3" ref={invoiceRef}>
          <div className="row">
            {/* Left Side */}
            <div className="col-lg-8 col-md-7 col-12 mb-3">
              <div className="d-flex flex-column flex-lg-row justify-content-start justify-content-lg-between align-items-center">
                <div className="fs-6 text-muted fw-bold align-self-start align-self-lg-center">
                  BOOKING ID - <>1234GPM</>
                </div>

                <div className="d-flex align-self-start align-self-lg-center align-items-center gap-3">
                  {/* <BsCalendarDate size={18} /> */}
                  <>
                    <div className="text-muted fw-bold">BOOKING DATE - </div>

                    <div>2025/06/25</div>
                  </>
                </div>
              </div>

              <div className={`cardd p-3 shadow-sm classokkaro`}>
                <div className="divviewopen" onClick={toggleview}>
                  <h4 className="d-flex gap-2">
                    <strong>Rajkot → Ahmedabad</strong>
                  </h4>
                  <div>
                    {viewopen ? (
                      <CiCircleChevUp size={25} />
                    ) : (
                      <CiCircleChevDown size={25} />
                    )}
                  </div>
                </div>
                {viewopen && (
                  <>
                    <div className="d-flex flex-column flex-lg-row align-items-center mt-5 mt-lg-4">
                      <div className="d-flex justify-content-between plannicompany">
                        <div>{<BsBusFront color="gray" size={30} />}</div>
                        <div className="d-flex flex-column gap-1">
                          <div className="text-muted">Eagle Express</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center mt-3 w-100 justify-content-between justify-content-lg-around">
                        <div className="d-flex flex-column text-center text-md-start">
                          <div className="fw-bold fs-6 fs-lg-4 ">Rajkot</div>
                          <div className="d-flex align-items-center flex-column flex-lg-row">
                            {/* <WiSunrise
                              size={20}
                              color="orange"
                              className="d-none d-lg-block"
                            /> */}
                            <div className="fw-bold">06:00 ,</div>
                            <div className="fw-bold"> 30/06/2025</div>
                          </div>
                          <div
                            className=""
                            style={{
                              borderBottom: "1px dashed gray",
                              marginTop: "10px",
                              width: "100%",
                            }}
                          />
                          <div className="d-flex flex-column mt-2">
                            <div className="text-muted">Moti tanki Chok</div>
                          </div>
                        </div>
                        <div className="durationdiv">
                          <div>
                            {/* <img
                              src={images.planecompleted}
                              style={{
                                height: "40px",
                                width: "50px",
                                objectFit: "fill",
                              }}
                            /> */}
                            <IoBus size={20} color="gray" />
                          </div>
                          <div className="d-flex w-100 align-items-center">
                            <GoDotFill size={25} color="gray" />
                            <div
                              style={{
                                border: "1px dashed gray",
                                width: "100%",
                              }}
                            />
                            <GoDotFill size={25} color="gray" />
                          </div>

                          <p className="small">5 hours</p>
                        </div>
                        <div className="d-flex flex-column text-center text-md-start">
                          <div className="fw-bold fs-6 fs-lg-4">Ahmedabad</div>
                          <div className="d-flex align-items-center flex-column flex-lg-row">
                            <div className="fw-bold">11:00 , </div>
                            <div className="fw-bold">30/06/2025</div>
                          </div>
                          <div
                            className=""
                            style={{
                              borderBottom: "1px dashed gray",
                              marginTop: "10px",
                              width: "100%",
                            }}
                          />
                          <div className="d-flex flex-column mt-2">
                            <div className="text-muted">Paldi Bus Stand</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="passengerDiv my-4">
                      <div className="table-responsive border rounded">
                        <table className="table mb-0">
                          <thead className="table-light table-light2">
                            <tr>
                              <th>Traveller</th>
                              <th>PNR/E-Ticket Number</th>
                              <th className="text-center">Seat</th>
                              <th className="text-center">Meal</th>
                              <th className="text-center">Excess Baggage</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="fw-semibold">Zeel Kaneria</td>
                              <td className="text-uppercase fw-semibold">
                                {"123AbC"}
                              </td>
                              <td className="text-center">-</td>
                              <td className="text-center">-</td>
                              <td className="text-center">-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="cardd my-4">
                <div className="info-box p-3 p-md-4 rounded shadow-sm">
                  <h6 className="fw-bold text-uppercase text-warning mb-3">
                    <i className="me-2 border-start border-4 border-warning ps-2">
                      Important Information
                    </i>
                  </h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3">
                      <span className="fw-semibold">
                        🟤 Check travel guidelines and baggage information
                        below:
                      </span>
                      <br />
                      Carry no more than 1 check-in baggage and 1 hand baggage
                      per passenger. If violated, airline may levy extra
                      charges.
                    </li>
                    <li className="mb-3">
                      <span className="fw-semibold">
                        🟤 Unaccompanied Minors Travelling:
                      </span>
                      <br />
                      An unaccompanied minor usually refers to a child traveling
                      without an adult aged 18 or older. Please check with the
                      airline for their rules and regulations regarding
                      unaccompanied minors, as these can differ between
                      airlines.
                    </li>
                    <li>
                      <span className="fw-semibold">
                        🟤 Valid ID proof needed:
                      </span>
                      <br />
                      Carry a valid photo identification proof (Driver Licence,
                      Aadhar Card, Pan Card or any other Government recognised
                      photo identification)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="cardd mt-3 shadow-sm p-3">
                <h6>
                  <strong className="fs-5 fs-lg-4 fw-bold">
                    CONTACT INFORMATION
                  </strong>
                </h6>
                <div>
                  Our Airline or our service experts might connect with you on{" "}
                  below contact details
                </div>
                <div className="mt-4 d-flex align-items-start gap-2">
                  <FaUser size={19} color="gray" />
                  <p className="">
                    <strong>zeel Kaneria</strong>
                  </p>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <IoMdMail size={19} color="gray" />
                  <p className="small text-dark">zeel@gmail.com</p>
                </div>
                <div className="d-flex align-items-start gap-2 mt-2">
                  <FaPhoneAlt size={19} color="gray" />
                  <p className="small text-dark">9874123650</p>
                </div>
              </div>

              <div className="cardd mt-3 shadow-sm p-3">
                <div>
                  <strong className="fs-5 fs-lg-4 fw-bold">CANCELLATION</strong>
                </div>
                <div>
                  Your Flight has already departed, online cancellation is not
                  allowed
                </div>
              </div>

              {/* <hr /> */}
            </div>

            {/* Right Side */}
            <div className="col-lg-4 col-md-5 col-12">
              <div className="cardd p-3 shadow-sm mb-3">
                <h6>
                  <strong>Ticket Invoice</strong>
                </h6>
                <button className="btn btn-outline-primary btn-sm mt-2">
                  Download Ticket
                </button>
              </div>

              <div className="cardd p-3 shadow-sm mb-3">
                <h6>
                  <strong>PRICING BREAKUP</strong>
                </h6>
                <div className="d-flex justify-content-between">
                  <span>Base Fare</span>
                  <span>₹ 300</span>
                </div>
                <div className="d-flex justify-content-between text-dark">
                  <span>Service Fee</span>
                  <span>- ₹ 0</span>
                </div>
                <div className="d-flex justify-content-between text-dark">
                  <span>Texes & Others</span>
                  <span>- ₹ 0</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total cost</strong>
                  <strong className="text-success">₹ 300</strong>
                </div>
              </div>

              <div className="cardd p-3 shadow-sm ">
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="fw-bold">Share On</div>
                  <div className="d-flex gap-4">
                    <div className="whatsappiocnn">
                      <IoLogoWhatsapp size={25} color="green" />
                    </div>
                    <div className="whatsappiocnn">
                      <SiGmail size={25} color="gray" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewBookingBus;
