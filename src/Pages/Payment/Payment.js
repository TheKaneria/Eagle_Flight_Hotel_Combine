import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Payment.css";
import { ACCEPT_HEADER, Payment_Api } from "../../Utils/Constant";

const RedirectToCCAvenue = ({ paymentData }) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (paymentData && formRef.current) {
      formRef.current.submit();
    }
  }, [paymentData]);

  if (!paymentData) return null;

  return (
    <form
      ref={formRef}
      method="post"
      id={paymentData.order_id}
      action={paymentData.payment_url}
    >
      {/* match exactly what CCAvenue expects */}
      <input type="hidden" name="encRequest" value={paymentData.enc_request} />
      <input type="hidden" name="access_code" value={paymentData.access_code} />
    </form>
  );
};

const Payment = () => {
  const [formData, setFormData] = useState({
    amount: "",
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentData, setPaymentData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault(); // ✅ prevent page reload
    const token = JSON.parse(localStorage.getItem("is_token"));

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setErrors({ amount: "Enter a valid amount" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        Payment_Api,
        { amount: formData.amount },
        {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setPaymentData(response.data);
      } else {
        throw new Error("Payment initiation failed");
      }
    } catch (err) {
      console.error("❌ Payment error:", err);
      alert(err.message || "Payment initiation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="header">
          <h2>🏦 CCAvenue Payment Gateway</h2>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label>Amount (₹) *</label>
            <input
              className={`payment_inpt ${errors.amount ? "error" : ""}`}
              placeholder="Enter amount (min ₹1, max ₹1,00,000)"
              type="number"
              min="1"
              max="100000"
              step="0.01"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              disabled={loading}
            />
            {errors.amount && (
              <span className="error-text">{errors.amount}</span>
            )}
          </div>
        </div>

        <div className="button-section">
          <button
            className="pay-button"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing Payment...
              </>
            ) : (
              <>
                <span>💳</span>
                Pay Now (Test Mode)
              </>
            )}
          </button>
        </div>
      </div>

      {paymentData && <RedirectToCCAvenue paymentData={paymentData} />}
    </div>
  );
};

export default Payment;
