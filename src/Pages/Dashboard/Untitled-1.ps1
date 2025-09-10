  <div className="container p-3 resp_view_main_sec">
                      <div className="row justify-content-start align-items-center">
                        {selectedTab === "upcoming" && (
                          <>
                            {currentData.map((item, index) => {
                              return (
                                <div className="completedmaintab">
                                  <div className="completeheader">
                                    <div className="row align-items-center justify-content-around gap-2 resp_dashboard">
                                      <div className="col-lg-8 align-items-center d-flex resp_dashboard_inner">
                                        <div className="row resp_dashboard_inner_first_part">
                                          <div className="col-12 d-flex align-items-center gap-2 resp_justify_center">
                                            <div className="completeFrom">
                                              {item.departure_city}
                                            </div>
                                            <div className="">
                                              <FaLongArrowAltRight />
                                            </div>
                                            <div className="completeFrom">
                                              {item.arrival_city}
                                            </div>
                                          </div>
                                          <div className="col-12 d-flex flex-column flex-lg-row align-items-center gap-lg-3 gap-1 mt-2 resp_dashboard_inner_first resp_justify_center">
                                            <div className="text-warning text-warning2">
                                              Upcoming
                                            </div>
                                            {selectedTabMainHome ===
                                            "flights" ? (
                                              <>
                                                <div className="dot_flex">
                                                  <div>
                                                    <GoDotFill />
                                                  </div>
                                                  {item.is_return == 0 ? (
                                                    <div className="fw-bold">
                                                      One Way
                                                    </div>
                                                  ) : (
                                                    <div className="fw-bold">
                                                      Round Trip
                                                    </div>
                                                  )}
                                                </div>
                                              </>
                                            ) : (
                                              <></>
                                            )}

                                            {getBookingDataFilter ===
                                            "flights" ? (
                                              <>
                                                <div className="dot_flex">
                                                  <div>
                                                    <GoDotFill />
                                                  </div>
                                                  <div className="text-secondary">
                                                    {item?.get_con === 0
                                                      ? "Booking ID - "
                                                      : "Reference ID - "}
                                                  </div>
                                                  <div className="text-secondary">
                                                    {item?.booking_id
                                                      ? item?.booking_id
                                                      : "N/A"}
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div className="dot_flex">
                                                  <div>
                                                    <GoDotFill />
                                                  </div>
                                                  <div className="text-secondary">
                                                    PNR No - &nbsp;
                                                  </div>
                                                  <div className="text-secondary">
                                                    {item?.booking_id
                                                      ? item?.booking_id
                                                      : "N/A"}
                                                  </div>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                          <div className="circlegol">
                                            {selectedTabMainHome ===
                                            "flight" ? (
                                              <>
                                                <img
                                                  className="complane"
                                                  src={images.planecompleted}
                                                />
                                              </>
                                            ) : (
                                              <>
                                                <LuBus size={25} />
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 d-flex align-items-center justify-content-center">
                                        <Link
                                          to={"/ViewBooking"}
                                          // onClick={BookingDetails}
                                          state={{ item }}
                                          className="completeViewBokingbtn"
                                        >
                                          View Booking
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="completesection">
                                    <div className="row w-100 align-items-center justify-content-between resp_ticket_detail_dash">
                                      <div className="col-lg-3 d-flex flex-column resp_dashboard_ticket_short_detail_main">
                                        <div className="text-secondary">
                                          From
                                        </div>
                                        <div className="completedDate">
                                          {moment(item.departure_date).format(
                                            "DD MMM'YY"
                                          )}{" "}
                                          <span className="text-secondary fw-light completedTime">
                                            {item.departure_time}
                                          </span>
                                        </div>
                                        <div className="d-flex gap-3">
                                          <div className="fw-bold">
                                            {item.departure_city}
                                          </div>
                                          <div className="text-muted">
                                            {item.terminal}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 d-flex flex-column resp_dashboard_ticket_short_detail_main">
                                        <div className="text-secondary from_min_width">
                                          To
                                        </div>
                                        <div className="completedDate">
                                          {moment(item.arrival_date).format(
                                            "DD MMM'YY"
                                          )}{" "}
                                          <span className="text-secondary fw-light completedTime">
                                            {item.arrival_time}
                                          </span>
                                        </div>
                                        <div className="d-flex gap-3">
                                          <div className="fw-bold">
                                            {item.arrival_city}
                                          </div>
                                          <div className="text-muted">
                                            {item.terminal}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 d-flex flex-column align-items-start resp_dashboard_ticket_short_detail_icon_flex">
                                        <div className="d-flex flex-row gap-3 mb-2">
                                          <GiCommercialAirplane size={19} />
                                          <div>{item.airline_name}</div>
                                        </div>
                                        {item?.child?.length > 0 && (
                                          <div className="d-flex flex-row gap-3 align-items-center">
                                            <FaUser size={19} />
                                            <div>
                                              {item.child[0].first_name}{" "}
                                              {item.child[0].last_name}{" "}
                                              {item.child.length > 1 && (
                                                <span>
                                                  +{item.child.length - 1}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-lg-3 d-flex flex-column text-center">
                                        <div>
                                          {(() => {
                                            const airline = item.airline_name;

                                            return airline ===
                                              "IndiGo Airlines" ||
                                              airline === "IndiGo" ? (
                                              <img
                                                src={images.IndiGoAirlines_logo}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : airline === "Neos" ? (
                                              <img
                                                src={images.neoslogo}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : airline === "SpiceJet" ? (
                                              <img
                                                src={images.spicejet}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : airline === "Air India" ? (
                                              <img
                                                src={images.airindialogo}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : airline === "Akasa Air" ? (
                                              <img
                                                src={images.akasalogo}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : airline === "Etihad" ? (
                                              <img
                                                src={images.etihadlogo}
                                                style={{
                                                  backgroundColor: "#fffbdb",
                                                  padding: "5px",
                                                  borderRadius: "5px",
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                                // className="airline_logo"
                                              />
                                            ) : airline === "Vistara" ? (
                                              <img
                                                src={images.vistaralogo}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : airline === "AirAsia X" ? (
                                              <img
                                                src={images.airasiax}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : airline === "AirAsia" ? (
                                              <img
                                                src={images.airasia}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : airline === "Azul" ? (
                                              <img
                                                src={images.azul}
                                                // className="airline_logo"
                                                style={{
                                                  width: "100px",
                                                  height: "50px",
                                                  objectFit: "contain",
                                                }}
                                              />
                                            ) : (
                                              <IoAirplaneSharp
                                                size={40}
                                                color="white"
                                              />
                                            );
                                          })()}
                                        </div>
                                      </div>
                                    </div>
                                    {item.is_return === 1 && (
                                      <>
                                        <div className="row w-100 align-items-center justify-content-between ">
                                          <div className="col-lg-3 d-flex flex-column resp_dashboard_ticket_short_detail_main">
                                            <div className="text-secondary">
                                              From
                                            </div>
                                            <div className="completedDate">
                                              {moment(
                                                item.return_departure_date
                                              ).format("DD MMM'YY")}{" "}
                                              <span className="text-secondary fw-light completedTime">
                                                {item.return_departure_time}
                                              </span>
                                            </div>
                                            <div className="d-flex gap-3">
                                              <div className="fw-bold">
                                                {item.return_departure_city}
                                              </div>
                                              <div className="text-muted">
                                                {item?.terminal
                                                  ? item.terminal
                                                  : "Terminal 1"}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-3 d-flex flex-column resp_dashboard_ticket_short_detail_main">
                                            <div className="text-secondary">
                                              To
                                            </div>
                                            <div className="completedDate">
                                              {moment(
                                                item.return_arrival_date
                                              ).format("DD MMM'YY")}{" "}
                                              <span className="text-secondary fw-light completedTime">
                                                {item.return_arrival_time}
                                              </span>
                                            </div>
                                            <div className="d-flex gap-3">
                                              <div className="fw-bold">
                                                {item.return_arrival_city}
                                              </div>
                                              <div className="text-muted">
                                                {item?.terminal
                                                  ? item.termial
                                                  : "Terminal 1"}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-3 d-flex flex-row flex-lg-column align-items-start justify-content-center gap-5 gap-lg-0 align-items-lg-start ">
                                            <div className="d-flex flex-row gap-3 mb-2">
                                              <GiCommercialAirplane size={19} />
                                              <div>
                                                {item.return_airline_name}
                                              </div>
                                            </div>
                                            {item?.child?.length > 0 && (
                                              <div className="d-flex flex-row gap-3 align-items-center">
                                                <FaUser size={19} />
                                                <div>
                                                  {item.child[0].first_name}{" "}
                                                  {item.child[0].last_name}{" "}
                                                  {item.child.length > 1 && (
                                                    <span>
                                                      +{item.child.length - 1}
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <div className="col-lg-3 d-flex flex-column text-center">
                                            <div>
                                              {(() => {
                                                const airline =
                                                  item.airline_name;

                                                return airline ===
                                                  "IndiGo Airlines" ||
                                                  airline === "IndiGo" ? (
                                                  <img
                                                    src={
                                                      images.IndiGoAirlines_logo
                                                    }
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : airline === "Neos" ? (
                                                  <img
                                                    src={images.neoslogo}
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : airline === "SpiceJet" ? (
                                                  <img
                                                    src={images.spicejet}
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : airline === "Air India" ? (
                                                  <img
                                                    src={images.airindialogo}
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : airline === "Akasa Air" ? (
                                                  <img
                                                    src={images.akasalogo}
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : airline === "Etihad" ? (
                                                  <img
                                                    src={images.etihadlogo}
                                                    style={{
                                                      backgroundColor:
                                                        "#fffbdb",
                                                      padding: "5px",
                                                      borderRadius: "5px",
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                    // className="airline_logo"
                                                  />
                                                ) : airline === "Vistara" ? (
                                                  <img
                                                    src={images.vistaralogo}
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : airline === "AirAsia X" ? (
                                                  <img
                                                    src={images.airasiax}
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : airline === "AirAsia" ? (
                                                  <img
                                                    src={images.airasia}
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : airline === "Azul" ? (
                                                  <img
                                                    src={images.azul}
                                                    // className="airline_logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "50px",
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                ) : (
                                                  <IoAirplaneSharp
                                                    size={40}
                                                    color="white"
                                                  />
                                                );
                                              })()}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}

                        {selectedTab === "CANCELLED" && (
                          <>
                            <div className="row my-3 align-items-center justify-content-center">
                              <div className="col-lg-4 d-flex align-items-center justify-content-center">
                                <img
                                  src={images.cancelledempty}
                                  className="tabcancelledempty"
                                />
                              </div>
                              <div className="col-12 text-center text-lg-start col-lg-6 mt-4 mt-lg-0">
                                <div className="emptytxtboldbig">
                                  Looks empty, you've no cancelled bookings.
                                </div>
                                <div className="emptytxtregular">
                                  There is no Cancelled Ticket{" "}
                                </div>
                                <Link className="plan-trip-btn" to={"/"}>
                                  Plan a Trip
                                </Link>
                              </div>
                            </div>
                          </>
                        )}

                        {selectedTab === "completed" && (
                          <>
                            {currentData.length <= 0 ? (
                              <>
                                <div className="row my-3 align-items-center justify-content-center">
                                  <div className="col-lg-4 d-flex align-items-center justify-content-center">
                                    <img
                                      src={images.completeempty}
                                      className="tabcancelledempty"
                                    />
                                  </div>
                                  <div className="col-12 text-center text-lg-start col-lg-6 mt-4 mt-lg-0">
                                    <div className="emptytxtboldbig">
                                      Looks empty, you've no Completed bookings.
                                    </div>
                                    <div className="emptytxtregular">
                                      There is no Completed Ticket{" "}
                                    </div>
                                    <Link className="plan-trip-btn" to={"/"}>
                                      Plan a Trip
                                    </Link>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {currentData.map((item, index) => {
                                  return (
                                    <>
                                      <div className="completedmaintab">
                                        <div className="completeheader">
                                          <div className="row align-items-center justify-content-around gap-2 resp_dashboard">
                                            <div className="col-lg-8 align-items-center d-flex resp_dashboard_inner">
                                              <div className="row resp_dashboard_inner_first_part">
                                                <div className="col-12 d-flex align-items-center gap-2 resp_justify_center">
                                                  <div className="completeFrom">
                                                    {item.departure_city}
                                                  </div>
                                                  <div className="">
                                                    <FaLongArrowAltRight />
                                                  </div>
                                                  <div className="completeFrom">
                                                    {item.arrival_city}
                                                  </div>
                                                </div>
                                                <div className="col-12 d-flex flex-column flex-lg-row align-items-center gap-lg-3 gap-1 mt-2 resp_dashboard_inner_first resp_justify_center">
                                                  <div className="text-warning text-warning2">
                                                    Upcoming
                                                  </div>
                                                  {selectedTabMainHome ===
                                                  "flights" ? (
                                                    <>
                                                      <div className="dot_flex">
                                                        <div>
                                                          <GoDotFill />
                                                        </div>
                                                        {item.is_return == 0 ? (
                                                          <div className="fw-bold">
                                                            One Way
                                                          </div>
                                                        ) : (
                                                          <div className="fw-bold">
                                                            Round Trip
                                                          </div>
                                                        )}
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}

                                                  {getBookingDataFilter ===
                                                  "flights" ? (
                                                    <>
                                                      <div className="dot_flex">
                                                        <div>
                                                          <GoDotFill />
                                                        </div>
                                                        <div className="text-secondary">
                                                          {item?.get_con === 0
                                                            ? "Booking ID - "
                                                            : "Reference ID - "}
                                                        </div>
                                                        <div className="text-secondary">
                                                          {item?.booking_id
                                                            ? item?.booking_id
                                                            : "N/A"}
                                                        </div>
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <div className="dot_flex">
                                                        <div>
                                                          <GoDotFill />
                                                        </div>
                                                        <div className="text-secondary">
                                                          PNR No - &nbsp;
                                                        </div>
                                                        <div className="text-secondary">
                                                          {item?.booking_id
                                                            ? item?.booking_id
                                                            : "N/A"}
                                                        </div>
                                                      </div>
                                                    </>
                                                  )}
                                                </div>
                                                <div className="circlegol">
                                                  {selectedTabMainHome ===
                                                  "flight" ? (
                                                    <>
                                                      <img
                                                        className="complane"
                                                        src={
                                                          images.planecompleted
                                                        }
                                                      />
                                                    </>
                                                  ) : (
                                                    <>
                                                      <LuBus size={25} />
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-3 d-flex align-items-center justify-content-center">
                                              <Link
                                                to={"/ViewBooking"}
                                                state={{ item }}
                                                className="completeViewBokingbtn"
                                              >
                                                View Booking
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="completesection">
                                          <div className="row w-100 align-items-center justify-content-between resp_ticket_detail_dash">
                                            <div className="col-lg-3 d-flex flex-column resp_dashboard_ticket_short_detail_main">
                                              <div className="text-secondary">
                                                From
                                              </div>
                                              <div className="completedDate">
                                                {moment(
                                                  item.departure_date
                                                ).format("DD MMM'YY")}{" "}
                                                <span className="text-secondary fw-light completedTime">
                                                  {item.departure_time}
                                                </span>
                                              </div>
                                              <div className="d-flex gap-3">
                                                <div className="fw-bold">
                                                  {item.departure_city}
                                                </div>
                                                <div className="text-muted">
                                                  {item.terminal}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-3 d-flex flex-column resp_dashboard_ticket_short_detail_main">
                                              <div className="text-secondary from_min_width">
                                                To
                                              </div>
                                              <div className="completedDate">
                                                {moment(
                                                  item.arrival_date
                                                ).format("DD MMM'YY")}{" "}
                                                <span className="text-secondary fw-light completedTime">
                                                  {item.arrival_time}
                                                </span>
                                              </div>
                                              <div className="d-flex gap-3">
                                                <div className="fw-bold">
                                                  {item.arrival_city}
                                                </div>
                                                <div className="text-muted">
                                                  {item.terminal}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-3 d-flex flex-column align-items-start resp_dashboard_ticket_short_detail_icon_flex">
                                              <div className="d-flex flex-row gap-3 mb-2">
                                                <GiCommercialAirplane
                                                  size={19}
                                                />
                                                <div>{item.airline_name}</div>
                                              </div>
                                              {item?.child?.length > 0 && (
                                                <div className="d-flex flex-row gap-3 align-items-center">
                                                  <FaUser size={19} />
                                                  <div>
                                                    {item.child[0].first_name}{" "}
                                                    {item.child[0].last_name}{" "}
                                                    {item.child.length > 1 && (
                                                      <span>
                                                        +{item.child.length - 1}
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            <div className="col-lg-3 d-flex flex-column text-center">
                                              <div>
                                                {(() => {
                                                  const airline =
                                                    item.airline_name;

                                                  return airline ===
                                                    "IndiGo Airlines" ||
                                                    airline === "IndiGo" ? (
                                                    <img
                                                      src={
                                                        images.IndiGoAirlines_logo
                                                      }
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : airline === "Neos" ? (
                                                    <img
                                                      src={images.neoslogo}
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : airline === "SpiceJet" ? (
                                                    <img
                                                      src={images.spicejet}
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : airline ===
                                                    "Air India" ? (
                                                    <img
                                                      src={images.airindialogo}
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : airline ===
                                                    "Akasa Air" ? (
                                                    <img
                                                      src={images.akasalogo}
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : airline === "Etihad" ? (
                                                    <img
                                                      src={images.etihadlogo}
                                                      style={{
                                                        backgroundColor:
                                                          "#fffbdb",
                                                        padding: "5px",
                                                        borderRadius: "5px",
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                      // className="airline_logo"
                                                    />
                                                  ) : airline === "Vistara" ? (
                                                    <img
                                                      src={images.vistaralogo}
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : airline ===
                                                    "AirAsia X" ? (
                                                    <img
                                                      src={images.airasiax}
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : airline === "AirAsia" ? (
                                                    <img
                                                      src={images.airasia}
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : airline === "Azul" ? (
                                                    <img
                                                      src={images.azul}
                                                      // className="airline_logo"
                                                      style={{
                                                        width: "100px",
                                                        height: "50px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  ) : (
                                                    <IoAirplaneSharp
                                                      size={40}
                                                      color="white"
                                                    />
                                                  );
                                                })()}
                                              </div>
                                            </div>
                                          </div>
                                          {item.is_return === 1 && (
                                            <>
                                              <div className="row w-100 align-items-center justify-content-between ">
                                                <div className="col-lg-3 d-flex flex-column resp_dashboard_ticket_short_detail_main">
                                                  <div className="text-secondary">
                                                    From
                                                  </div>
                                                  <div className="completedDate">
                                                    {moment(
                                                      item.return_departure_date
                                                    ).format("DD MMM'YY")}{" "}
                                                    <span className="text-secondary fw-light completedTime">
                                                      {
                                                        item.return_departure_time
                                                      }
                                                    </span>
                                                  </div>
                                                  <div className="d-flex gap-3">
                                                    <div className="fw-bold">
                                                      {
                                                        item.return_departure_city
                                                      }
                                                    </div>
                                                    <div className="text-muted">
                                                      {item?.terminal
                                                        ? item.terminal
                                                        : "Terminal 1"}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-lg-3 d-flex flex-column resp_dashboard_ticket_short_detail_main">
                                                  <div className="text-secondary">
                                                    To
                                                  </div>
                                                  <div className="completedDate">
                                                    {moment(
                                                      item.return_arrival_date
                                                    ).format("DD MMM'YY")}{" "}
                                                    <span className="text-secondary fw-light completedTime">
                                                      {item.return_arrival_time}
                                                    </span>
                                                  </div>
                                                  <div className="d-flex gap-3">
                                                    <div className="fw-bold">
                                                      {item.return_arrival_city}
                                                    </div>
                                                    <div className="text-muted">
                                                      {item?.terminal
                                                        ? item.termial
                                                        : "Terminal 1"}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-lg-3 d-flex flex-column align-items-start">
                                                  <div className="d-flex flex-row gap-3 mb-2">
                                                    <GiCommercialAirplane
                                                      size={19}
                                                    />
                                                    <div>
                                                      {item.return_airline_name}
                                                    </div>
                                                  </div>
                                                  {item?.child?.length > 0 && (
                                                    <div className="d-flex flex-row gap-3 align-items-center">
                                                      <FaUser size={19} />
                                                      <div>
                                                        {
                                                          item.child[0]
                                                            .first_name
                                                        }{" "}
                                                        {
                                                          item.child[0]
                                                            .last_name
                                                        }{" "}
                                                        {item.child.length >
                                                          1 && (
                                                          <span>
                                                            +
                                                            {item.child.length -
                                                              1}
                                                          </span>
                                                        )}
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                                <div className="col-lg-3 d-flex flex-column text-center">
                                                  <div>
                                                    {(() => {
                                                      const airline =
                                                        item.airline_name;

                                                      return airline ===
                                                        "IndiGo Airlines" ||
                                                        airline === "IndiGo" ? (
                                                        <img
                                                          src={
                                                            images.IndiGoAirlines_logo
                                                          }
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : airline === "Neos" ? (
                                                        <img
                                                          src={images.neoslogo}
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : airline ===
                                                        "SpiceJet" ? (
                                                        <img
                                                          src={images.spicejet}
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : airline ===
                                                        "Air India" ? (
                                                        <img
                                                          src={
                                                            images.airindialogo
                                                          }
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : airline ===
                                                        "Akasa Air" ? (
                                                        <img
                                                          src={images.akasalogo}
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : airline ===
                                                        "Etihad" ? (
                                                        <img
                                                          src={
                                                            images.etihadlogo
                                                          }
                                                          style={{
                                                            backgroundColor:
                                                              "#fffbdb",
                                                            padding: "5px",
                                                            borderRadius: "5px",
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                          // className="airline_logo"
                                                        />
                                                      ) : airline ===
                                                        "Vistara" ? (
                                                        <img
                                                          src={
                                                            images.vistaralogo
                                                          }
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : airline ===
                                                        "AirAsia X" ? (
                                                        <img
                                                          src={images.airasiax}
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : airline ===
                                                        "AirAsia" ? (
                                                        <img
                                                          src={images.airasia}
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : airline === "Azul" ? (
                                                        <img
                                                          src={images.azul}
                                                          // className="airline_logo"
                                                          style={{
                                                            width: "100px",
                                                            height: "50px",
                                                            objectFit:
                                                              "contain",
                                                          }}
                                                        />
                                                      ) : (
                                                        <IoAirplaneSharp
                                                          size={40}
                                                          color="white"
                                                        />
                                                      );
                                                    })()}
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>