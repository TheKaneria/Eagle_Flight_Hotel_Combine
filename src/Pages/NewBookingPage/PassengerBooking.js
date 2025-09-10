import React, { useState } from "react";
import "./PassengerBooking.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PassengerBooking = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedBaggage, setSelectedBaggage] = useState(null);
  const [activeTab, setActiveTab] = useState("seats");
  const [modalOpen, setModalOpen] = useState(false);

  const data = {
    meal: [
      {
        origin: "HSR",
        destination: "BOM",
        options: [
          {
            code: "TCSW",
            amt: 320,
            dsc: "Tomato Cucumber Cheese Lettuce Sandwich Combo",
          },
          { code: "CJSW", amt: 400, dsc: "Chicken Junglee Sandwich Combo" },
          { code: "PTSW", amt: 500, dsc: "Paneer Tikka Sandwich Combo" },
        ],
      },
    ],
    baggage: [
      {
        origin: "HSR",
        destination: "BOM",
        options: [
          { code: "XBPE", amt: 1155, dsc: "Excess Baggage - 3 Kg" },
          { code: "XBPA", amt: 1925, dsc: "Excess Baggage - 5 Kg" },
          { code: "XBPB", amt: 3850, dsc: "Excess Baggage - 10 Kg" },
          { code: "XBPC", amt: 4725, dsc: "Excess Baggage - 15 Kg" },
          { code: "XBPD", amt: 9450, dsc: "Excess Baggage - 30 Kg" },
        ],
      },
    ],
    seat: [
      {
        origin: "HSR",
        destination: "BOM",
        facets: {
          price: [
            { id: 1, label: "₹180-₹1140" },
            { id: 2, label: "₹1141-₹2100" },
          ],
        },
        rowSeats: [
          {
            seats: [
              {
                code: "1A",
                seatNo: "1A",
                isBooked: true,
                amt: 2100,
                isLegroom: true,
                priceBracket: 2,
              },
              {
                code: "1B",
                seatNo: "1B",
                isBooked: false,
                amt: 2100,
                isLegroom: true,
                priceBracket: 2,
              },
              {
                code: "1C",
                seatNo: "1C",
                isBooked: false,
                amt: 2100,
                isAisle: true,
                isLegroom: true,
                priceBracket: 2,
              },
              { code: null },
              {
                code: "1D",
                seatNo: "1D",
                isBooked: false,
                amt: 2100,
                isAisle: true,
                isLegroom: true,
                priceBracket: 2,
              },
              {
                code: "1E",
                seatNo: "1E",
                isBooked: false,
                amt: 2100,
                isLegroom: true,
                priceBracket: 2,
              },
              {
                code: "1F",
                seatNo: "1F",
                isBooked: false,
                amt: 2100,
                isLegroom: true,
                priceBracket: 2,
              },
            ],
          },
          {
            seats: [
              {
                code: "2A",
                seatNo: "2A",
                isBooked: false,
                amt: 750,
                priceBracket: 1,
              },
              {
                code: "2B",
                seatNo: "2B",
                isBooked: false,
                amt: 750,
                priceBracket: 1,
              },
              {
                code: "2C",
                seatNo: "2C",
                isBooked: false,
                amt: 750,
                isAisle: true,
                priceBracket: 1,
              },
              { code: null },
              {
                code: "2D",
                seatNo: "2D",
                isBooked: false,
                amt: 750,
                isAisle: true,
                priceBracket: 1,
              },
              {
                code: "2E",
                seatNo: "2E",
                isBooked: false,
                amt: 750,
                priceBracket: 1,
              },
              {
                code: "2F",
                seatNo: "2F",
                isBooked: false,
                amt: 750,
                priceBracket: 1,
              },
            ],
          },
          {
            seats: [
              {
                code: "6A",
                seatNo: "6A",
                isBooked: false,
                amt: 245,
                priceBracket: 1,
              },
              {
                code: "6B",
                seatNo: "6B",
                isBooked: false,
                amt: 245,
                priceBracket: 1,
              },
              {
                code: "6C",
                seatNo: "6C",
                isBooked: false,
                amt: 245,
                isAisle: true,
                priceBracket: 1,
              },
              { code: null },
              {
                code: "6D",
                seatNo: "6D",
                isBooked: false,
                amt: 245,
                isAisle: true,
                priceBracket: 1,
              },
              {
                code: "6E",
                seatNo: "6E",
                isBooked: false,
                amt: 245,
                priceBracket: 1,
              },
              {
                code: "6F",
                seatNo: "6F",
                isBooked: false,
                amt: 245,
                priceBracket: 1,
              },
            ],
          },
          {
            seats: [
              {
                code: "26A",
                seatNo: "26A",
                isBooked: false,
                amt: 175,
                priceBracket: 1,
              },
              { code: "26B", seatNo: "26B", isBooked: true, amt: 0 },
              {
                code: "26C",
                seatNo: "26C",
                isBooked: false,
                amt: 175,
                isAisle: true,
                priceBracket: 1,
              },
              { code: null },
              {
                code: "26D",
                seatNo: "26D",
                isBooked: false,
                amt: 175,
                isAisle: true,
                priceBracket: 1,
              },
              { code: "26E", seatNo: "26E", isBooked: false, amt: 0 },
              {
                code: "26F",
                seatNo: "26F",
                isBooked: false,
                amt: 175,
                priceBracket: 1,
              },
            ],
          },
        ],
      },
    ],
  };

  const handleSeatSelect = (seat) => {
    if (!seat.isBooked && seat.code) {
      setSelectedSeat(seat);
      setModalOpen(true);
    }
  };

  const handleConfirmSeat = () => {
    setModalOpen(false);
    // You can proceed with confirmed seat logic
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSeat(null);
  };
  const handleMealSelect = (meal) => {
    setSelectedMeal(selectedMeal?.code === meal.code ? null : meal);
  };

  const handleBaggageSelect = (baggage) => {
    setSelectedBaggage(selectedBaggage?.code === baggage.code ? null : baggage);
  };

  const getTotalAmount = () => {
    let total = 0;
    if (selectedSeat) total += selectedSeat.amt;
    if (selectedMeal) total += selectedMeal.amt;
    if (selectedBaggage) total += selectedBaggage.amt;
    return total;
  };

  const SeatMap = () => (
    <div className="seat-map">
      <div className="aircraft-body">
        {/* Legend */}
        <div className="seat-legend">
          <div className="legend-item">
            <span className="seat-icon available"></span>Free
          </div>
          <div className="legend-item">
            <span className="seat-icon booked"></span>Booked
          </div>
          <div className="legend-item">
            <span className="seat-icon selected"></span>Selected
          </div>
          <div className="legend-item">
            <span className="seat-icon premium"></span>Premium
          </div>
        </div>

        {data.seat[0].rowSeats.slice(0, 2).map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.seats.map((seat, seatIndex) => (
              <div key={seatIndex} className="seat-container">
                {seat.code ? (
                  <button
                    className={`seat ${
                      seat.isBooked ? "booked" : "available"
                    } ${seat.priceBracket === 2 ? "premium" : ""} ${
                      selectedSeat?.code === seat.code ? "selected" : ""
                    } ${seat.isLegroom ? "legroom" : ""} ${
                      seat.isAisle ? "" : ""
                    } ${seat.amt == 0 ? "free" : ""}`}
                    onClick={() => handleSeatSelect(seat)}
                    disabled={seat.isBooked}
                    title={`${seat.seatNo} - ₹${seat.amt} ${
                      seat.isLegroom ? "(Extra Legroom)" : ""
                    }`}
                  >
                    <span className="seat-number">{seat.seatNo}</span>
                  </button>
                ) : (
                  <div className="seat-gap"></div>
                )}
              </div>
            ))}
          </div>
        ))}

        {data.seat[0].rowSeats.slice(2).map((row, rowIndex) => (
          <div key={rowIndex + 2} className="seat-row">
            {row.seats.map((seat, seatIndex) => (
              <div key={seatIndex} className="seat-container">
                {seat.code ? (
                  <button
                    className={`seat ${
                      seat.isBooked ? "booked" : "available"
                    } ${seat.priceBracket === 2 ? "premium" : ""} ${
                      selectedSeat?.code === seat.code ? "selected" : ""
                    } ${seat.isLegroom ? "legroom" : ""} ${
                      seat.isAisle ? "" : ""
                    } ${seat.amt == 0 ? "free" : ""}`}
                    onClick={() => handleSeatSelect(seat)}
                    disabled={seat.isBooked}
                    title={`${seat.seatNo} - ₹${seat.amt} ${
                      seat.isLegroom ? "(Extra Legroom)" : ""
                    }`}
                  >
                    <span className="seat-number">{seat.seatNo}</span>
                  </button>
                ) : (
                  <div className="seat-gap"></div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="aircraft-tail"></div>
      </div>

      {/* Seat Confirmation Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="xs"
        fullWidth
        PaperProps={{ className: "custom-dialog" }}
      >
        <DialogTitle className="dialog-header">
          <Typography variant="h6" sx={{ flex: 1 }}>
            Confirm Seat
          </Typography>
          <IconButton className="close-icon" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers className="dialog-body">
          {selectedSeat && (
            <>
              <Typography>
                <strong>Seat:</strong> {selectedSeat.seatNo}
              </Typography>
              <Typography>
                <strong>Type:</strong>{" "}
                {selectedSeat.isAisle
                  ? "Aisle Seat"
                  : selectedSeat.seatNo.endsWith("A") ||
                    selectedSeat.seatNo.endsWith("F")
                  ? "Window Seat"
                  : "Middle Seat"}
              </Typography>
              <Typography>
                <strong>Price:</strong> ₹{selectedSeat.amt}
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions className="dialog-footer">
          <Button onClick={handleCloseModal} className="cancel-btn">
            Cancel
          </Button>
          <Button onClick={handleConfirmSeat} className="confirm-btn">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const MealSelection = () => (
    <div className="meal-selection">
      <h3>Select Your Meal</h3>
      <p className="section-description">
        Choose from our delicious in-flight meal options
      </p>
      <div className="selection-grid">
        {data.meal[0].options.map((meal) => (
          <div
            key={meal.code}
            className={`selection-card ${
              selectedMeal?.code === meal.code ? "selected" : ""
            }`}
            onClick={() => handleMealSelect(meal)}
            role="button"
          >
            <div className="card-content">
              <div className="icon">🍽️</div>
              <h4>{meal.dsc}</h4>
              <p className="price">₹{meal.amt}</p>
              <div className="card-badge">Popular</div>
            </div>
          </div>
        ))}
        <div
          className={`selection-card ${!selectedMeal ? "selected" : ""}`}
          onClick={() => setSelectedMeal(null)}
          role="button"
        >
          <div className="card-content">
            <div className="icon">❌</div>
            <h4>No Meal</h4>
            <p className="text-muted">Skip meal selection</p>
          </div>
        </div>
      </div>
    </div>
  );

  const BaggageSelection = () => (
    <div className="baggage-selection">
      <h3>Select Extra Baggage</h3>
      <p className="section-description">
        Add extra baggage allowance for your journey
      </p>
      <div className="selection-grid">
        {data.baggage[0].options.map((baggage) => (
          <div
            key={baggage.code}
            className={`selection-card ${
              selectedBaggage?.code === baggage.code ? "selected" : ""
            }`}
            onClick={() => handleBaggageSelect(baggage)}
            role="button"
          >
            <div className="card-content">
              <div className="icon">🧳</div>
              <h4>{baggage.dsc}</h4>
              <p className="price">₹{baggage.amt}</p>
            </div>
          </div>
        ))}
        <div
          className={`selection-card ${!selectedBaggage ? "selected" : ""}`}
          onClick={() => setSelectedBaggage(null)}
          role="button"
        >
          <div className="card-content">
            <div className="icon">✅</div>
            <h4>Standard Baggage</h4>
            <p className="text-muted">15 Kg included</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="airline-booking">
      <div className="container">
        <div className="booking-container">
          <div className="booking-header">
            <div className="flight-route-badge">
              <span className="origin">HSR</span>
              <div className="flight-arrow">➝</div>
              <span className="destination">BOM</span>
            </div>
            <h1>Customize Your Flight Experience</h1>
            <p>Select your seat, meal, and baggage options</p>
          </div>

          {/* <div className="tabs-containerrok"> */}
          <div className="navv-tabss">
            <button
              className={`nav-tab ${activeTab === "passenger" ? "active" : ""}`}
              onClick={() => setActiveTab("passenger")}
            >
              <span className="tab-icon">🧍‍♂️</span>
              <span className="tab-label">Passenger</span>
            </button>

            <button
              className={`nav-tab ${activeTab === "seats" ? "active" : ""}`}
              onClick={() => setActiveTab("seats")}
            >
              <span className="tab-icon">💺</span>
              <span className="tab-label">Seats</span>
            </button>

            <button
              className={`nav-tab ${activeTab === "meals" ? "active" : ""}`}
              onClick={() => setActiveTab("meals")}
            >
              <span className="tab-icon">🍽️</span>
              <span className="tab-label">Meals</span>
            </button>

            <button
              className={`nav-tab ${activeTab === "baggage" ? "active" : ""}`}
              onClick={() => setActiveTab("baggage")}
            >
              <span className="tab-icon">🧳</span>
              <span className="tab-label">Baggage</span>
            </button>
          </div>

          {/* </div> */}

          <div className="main-content">
            <div className="content-panel">
              <div className="tab-content">
                {activeTab === "seats" && <SeatMap />}
                {activeTab === "meals" && <MealSelection />}
                {activeTab === "baggage" && <BaggageSelection />}
              </div>
            </div>

            <div className="summary-panel">
              <div className="summary-card">
                <div className="summary-header">
                  <h3>Booking Summary</h3>
                </div>

                <div className="flight-info">
                  <div className="route">
                    <span className="city">Rajkot</span>
                    <span className="airport">(HSR)</span>
                    <div className="flight-dash">—</div>
                    <span className="city">Mumbai</span>
                    <span className="airport">(BOM)</span>
                  </div>
                  <div className="flight-date">15 Nov 2023 • 10:30 AM</div>
                </div>

                <div className="summary-details">
                  <div className="summary-item">
                    <span className="label">Seat Selection</span>
                    <div className="value">
                      {selectedSeat ? (
                        <span className="selected-option">
                          {selectedSeat.seatNo}{" "}
                          <span className="price">₹{selectedSeat.amt}</span>
                        </span>
                      ) : (
                        <span className="not-selected">Not selected</span>
                      )}
                    </div>
                  </div>

                  <div className="summary-item">
                    <span className="label">Meal</span>
                    <div className="value">
                      {selectedMeal ? (
                        <span className="selected-option">
                          {selectedMeal.dsc}{" "}
                          <span className="price">₹{selectedMeal.amt}</span>
                        </span>
                      ) : (
                        <span className="not-selected">Not selected</span>
                      )}
                    </div>
                  </div>

                  <div className="summary-item">
                    <span className="label">Baggage</span>
                    <div className="value">
                      {selectedBaggage ? (
                        <span className="selected-option">
                          {selectedBaggage.dsc}{" "}
                          <span className="price">₹{selectedBaggage.amt}</span>
                        </span>
                      ) : (
                        <span className="not-selected">Standard (15 Kg)</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="summary-total">
                  <div className="total-label">Total</div>
                  <div className="total-amount">₹{getTotalAmount()}</div>
                </div>

                <button className="btn-proceed" disabled={!selectedSeat}>
                  Continue to Payment
                </button>

                <div className="security-note">
                  <div className="lock-icon">🔒</div>
                  Your information is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerBooking;
