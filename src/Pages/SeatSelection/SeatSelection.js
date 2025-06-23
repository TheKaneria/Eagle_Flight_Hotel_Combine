import React, { useState } from "react";
import "./SeatSelection.css";
import { PiSteeringWheelFill } from "react-icons/pi";

const SeatSelection = () => {
  const [selectedBoarding, setSelectedBoarding] = useState("Indira Circle");
  const [selectedDropping, setSelectedDropping] = useState(
    "Shree Ramkrupa Travels, Narsang Tekri"
  );

  const boardingPoints = [
    {
      time: "17:00",
      name: "Indira Circle",
      address: "Raiya Telephone Exchange Opp. Water Tank 150 FT Ring Road",
    },

    {
      time: "17:05",
      name: "Big Bazar",
      address: "Relince MAIL,150ft Ring Road",
    },
    { time: "17:10", name: "Gondal Chokdi", address: "Gondal Chokdi,Rajkot" },
    { time: "17:12", name: "Toyota Show Room ,Kalpvan,Rajkot", address: "" },
    {
      time: "17:25",
      name: "Maruti Travels,End Of Bridge(Shapar)",
      address: "",
    },
  ];

  const droppingPoints = [
    "Kutiyana-Bypass",
    "Ranavav Bypass",
    "AirPort, Porbandar",
    "Shree Ramkrupa Travels, Narsang Tekri",
    "Jalaram Colony",
    "Kaveri Hotel",
    "Vadilal Ice Cream",
    "Shree Ramkrupa Travels, Opp Sadhna Studio SVP Road Porbandar",
  ];

  const rows = 6;
  const columns = 4;
  const seatsPerColumn = 9;
  const price = "₹300";

  const generateSeats = () => {
    const seats = [];
    let seatNumber = 1;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push({
          number: seatNumber++,
          isBooked: false,
          price: 300,
        });
      }
      seats.push(row);
    }
    return seats;
  };

  const [seats, setSeats] = useState(generateSeats());
  const [selected, setSelected] = useState([]);

  const toggleSeat = (rowIdx, colIdx) => {
    const seat = seats[rowIdx][colIdx];
    if (seat.isBooked) return;

    const seatId = seat.number;
    let newSelected = [...selected];

    if (newSelected.includes(seatId)) {
      newSelected = newSelected.filter((num) => num !== seatId);
    } else {
      newSelected.push(seatId);
    }

    setSelected(newSelected);
  };

  const generateSeatsSleeper = (type) => {
    const seats = [];
    for (let i = 0; i < rows; i++) {
      seats.push(
        { id: `${type}-left-${i}`, position: "left" },
        { id: `${type}-right-${i}-1`, position: "right" },
        { id: `${type}-right-${i}-2`, position: "right" }
      );
    }
    return seats;
  };

  const lowerSeats = generateSeatsSleeper("lower");
  const upperSeats = generateSeatsSleeper("upper");

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSleeper = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeatsSleeper = (seats) => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 3) {
      const seat1 = seats[i];
      const seat2 = seats[i + 1];
      const seat3 = seats[i + 2];

      rows.push(
        <div className="seat-row" key={i}>
          {seat1 && (
            <div className="seatsleeper-block single">
              <div
                className={`seatsleeper ${
                  selectedSeats.includes(seat1.id) ? "selected" : ""
                }`}
                onClick={() => toggleSeatSleeper(seat1.id)}
              >
                <div className="seat-shape"></div>
                <div className="seat-price">{price}</div>
              </div>
            </div>
          )}

          <div className="aisle-space" />

          <div className="seatsleeper-block double">
            {[seat2, seat3].map(
              (seat) =>
                seat && (
                  <div
                    key={seat.id}
                    className={`seatsleeper ${
                      selectedSeats.includes(seat.id) ? "selected" : ""
                    }`}
                    onClick={() => toggleSeatSleeper(seat.id)}
                  >
                    <div className="seat-shape"></div>
                    <div className="seat-price">{price}</div>
                  </div>
                )
            )}
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="mainzk-cont">
      {/* <div className="bus-container">
        <div className="steering-wheel">
          <PiSteeringWheelFill size={40} />
        </div>

        <div className="seats">
          {seats.map((row, rowIdx) => (
            <div key={rowIdx} className="seat-row">
              {row.map((seat, colIdx) => (
                <React.Fragment key={colIdx}>
                  {colIdx === 2 && <div className="aisle" />}
                  <div className="seat-block">
                    <div
                      className={`seat-image ${
                        selected.includes(seat.number) ? "selected" : ""
                      }`}
                      onClick={() => toggleSeat(rowIdx, colIdx)}
                    />
                    <div className="seat-price">₹{seat.price}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div> */}

      <div className="layout-container">
        <div className="columnn">
          <h4 className="column-title">LOWER BERTH (27)</h4>
          {renderSeatsSleeper(lowerSeats)}
        </div>
        <div className="columnn">
          <h4 className="column-title">UPPER BERTH (27)</h4>
          {renderSeatsSleeper(upperSeats)}
        </div>
      </div>

      <div className="pickupdrop-container">
        <div className="addresscards">
          <h5
            style={{ marginBottom: 20, fontWeight: "bolder", paddingLeft: 20 }}
          >
            Boarding points
          </h5>
          {boardingPoints.map((point, index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  selectedBoarding === point.name ? "#fff4eb" : "transparent",
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <label className="labelnistyle">
                <div className="labelnistylenochild1">
                  <input
                    type="radio"
                    name="boarding"
                    className="custom-radiozk"
                    value={point.name}
                    checked={selectedBoarding === point.name}
                    onChange={() => setSelectedBoarding(point.name)}
                  />
                </div>
                <div className="labelnistylenochild2">
                  <div className="radio-content">
                    <div className="radio-title">
                      {point.time} &nbsp; {point.name}
                    </div>
                    {point.address && (
                      <div className="radio-subtitle">{point.address}</div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Dropping Points */}
        <div className="addresscards">
          <h5
            style={{ marginBottom: 20, fontWeight: "bolder", paddingLeft: 20 }}
          >
            Dropping points
          </h5>
          {droppingPoints.map((drop, index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  selectedDropping === drop ? "#fff4eb" : "transparent",
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <label className="labelnistyle">
                <div className="labelnistylenochild1">
                  <input
                    type="radio"
                    name="dropping"
                    className="custom-radiozk"
                    value={drop}
                    checked={selectedDropping === drop}
                    onChange={() => setSelectedDropping(drop)}
                    style={{ marginRight: 10 }}
                  />
                </div>
                <div className="labelnistylenochild2">
                  <div style={{ fontWeight: "bold", fontSize: 16 }}>{drop}</div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
