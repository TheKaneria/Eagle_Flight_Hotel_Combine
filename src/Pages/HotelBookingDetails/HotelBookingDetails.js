import React, { useState } from "react";
import Modal from "react-modal";
import "./HotelBookingDetails.css";

// Set app element for accessibility
Modal.setAppElement("#root");

// Hotel images organized by category
const hotelImages = {
  all: [
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      category: "Facilities",
    },
    {
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      category: "Dining",
    },
    {
      url: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=800&h=600&fit=crop",
      category: "Property views",
    },
    {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
      category: "Nearby attraction",
    },
  ],
  rooms: [
    {
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
      category: "Rooms",
    },
  ],
  facilities: [
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      category: "Facilities",
    },
  ],
  dining: [
    {
      url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      category: "Dining",
    },
  ],
  propertyViews: [
    {
      url: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=800&h=600&fit=crop",
      category: "Property views",
    },
  ],
  nearbyAttraction: [
    {
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
      category: "Nearby attraction",
    },
  ],
};

function HotelBookingDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getImagesByTab = () => {
    switch (activeTab) {
      case "all":
        return hotelImages.all;
      case "rooms":
        return hotelImages.rooms;
      case "facilities":
        return hotelImages.facilities;
      case "dining":
        return hotelImages.dining;
      case "propertyViews":
        return hotelImages.propertyViews;
      case "nearbyAttraction":
        return hotelImages.nearbyAttraction;
      default:
        return hotelImages.all;
    }
  };

  return (
    <div className="hotel-container">
      <div className="hotel-header">
        <div className="hotel-info">
          <h1 className="hotel-name-details">
            Woods at Sasan
            <span className="rating-stars">★★★★★</span>
          </h1>
          <p className="hotel-address">Sasan Talala Road, Sasan Gir 362 135</p>
          <div className="review-badge">
            <span className="score">8.7</span>
            <span className="review-text">Very good</span>
            <span className="review-count">97 reviews</span>
          </div>
        </div>
        <div className="hotel-pricing">
          <div className="price">₹ 23,890</div>
          <div className="price-detail">Nightly including VAT</div>
          <div className="action-buttons">
            <button className="btn-primary">Confirm Deal</button>
          </div>
        </div>
      </div>

      <div className="gallery-grid">
        <div className="gallery-item main-image" onClick={openModal}>
          <img
            src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop"
            alt="Main bedroom view"
          />
          <div className="photo-count">All photos (51)</div>
        </div>

        <div className="gallery-item" onClick={openModal}>
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
            alt="Other view"
          />
          <div className="photo-label">Rooms (8)</div>
        </div>

        <div className="gallery-item" onClick={openModal}>
          <img
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop"
            alt="Bathroom"
          />
          <div className="photo-label">Property views (26)</div>
        </div>

        <div className="gallery-item" onClick={openModal}>
          <img
            src="https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=400&h=300&fit=crop"
            alt="Outdoor view"
          />
          <div className="photo-label">Facilities (11)</div>
        </div>

        <div className="gallery-item" onClick={openModal}>
          <img
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop"
            alt="Bedroom"
          />
          <div className="photo-label">Dining (4)</div>
          <button className="view-all-btn" onClick={openModal}>
            View all photos
          </button>
        </div>
      </div>

      {/* React Modal Bottom Sheet */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={300}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "flex",
            alignItems: "flex-end",
          },
          content: {
            position: "relative",
            inset: "auto",
            border: "none",
            background: "white",
            overflow: "visible",
            borderRadius: "16px 16px 0 0",
            padding: 0,
            width: "100%",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <div className="modal-header">
          <h2 className="modal-title">
            <div className="modal-tabs">
              <button
                className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All (51)
              </button>
              <button
                className={`tab-btn ${activeTab === "rooms" ? "active" : ""}`}
                onClick={() => setActiveTab("rooms")}
              >
                Rooms (8)
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "propertyViews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("propertyViews")}
              >
                Property views (26)
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "facilities" ? "active" : ""
                }`}
                onClick={() => setActiveTab("facilities")}
              >
                Facilities (11)
              </button>
              <button
                className={`tab-btn ${activeTab === "dining" ? "active" : ""}`}
                onClick={() => setActiveTab("dining")}
              >
                Dining (4)
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "nearbyAttraction" ? "active" : ""
                }`}
                onClick={() => setActiveTab("nearbyAttraction")}
              >
                Nearby attraction (2)
              </button>
            </div>
          </h2>
          <button className="close-btn" onClick={closeModal}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="image-grid">
            {getImagesByTab().map((image, index) => (
              <div key={index} className="image-grid-item">
                <img src={image.url} alt={`${image.category} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HotelBookingDetails;
