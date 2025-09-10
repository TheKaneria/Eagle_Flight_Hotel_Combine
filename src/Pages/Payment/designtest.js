import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Download,
  Eye,
  Copy,
  Phone,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentStatus2 = () => {
  const [paymentData] = useState({
    order_status: "Success",
    order_id: "ORD-2024-567890",
    tracking_id: "PAY-789012345",
    trans_date: "Sep 09, 2024 • 3:15 PM",
    amount: "₹1,850.00",
    currency: "INR",
    payment_mode: "Debit Card",
    card_name: "State Bank of India",
    billing_name: "Amit Patel",
    billing_email: "amit.patel@example.com",
    billing_tel: "+91 99887 76543",
    billing_address: "201, Green Valley Apartments",
    billing_city: "Ahmedabad",
    billing_state: "Gujarat",
    billing_zip: "380052",
    billing_country: "India",
    delivery_name: "Amit Patel",
    delivery_tel: "+91 99887 76543",
    delivery_address: "201, Green Valley Apartments",
    delivery_city: "Ahmedabad",
    delivery_state: "Gujarat",
    delivery_zip: "380052",
    delivery_country: "India",
    failure_message: "Card verification failed",
  });

  const [copiedField, setCopiedField] = useState(null);

  const isSuccess = paymentData?.order_status === "Success";
  const isCancelled = paymentData?.order_status === "Cancelled";
  const isFailed = paymentData?.order_status === "Failed";

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusConfig = () => {
    if (isSuccess) {
      return {
        icon: <CheckCircle size={48} className="status-icon-success" />,
        title: "Payment Successful",
        subtitle: "Your transaction has been completed",
        bgColor: "#f0fdf4",
        borderColor: "#22c55e",
        textColor: "#15803d",
      };
    } else if (isCancelled) {
      return {
        icon: <AlertTriangle size={48} className="status-icon-warning" />,
        title: "Payment Cancelled",
        subtitle: "Transaction was cancelled by user",
        bgColor: "#fffbeb",
        borderColor: "#f59e0b",
        textColor: "#d97706",
      };
    } else {
      return {
        icon: <XCircle size={48} className="status-icon-error" />,
        title: "Payment Failed",
        subtitle:
          paymentData?.failure_message || "Transaction could not be processed",
        bgColor: "#fef2f2",
        borderColor: "#ef4444",
        textColor: "#dc2626",
      };
    }
  };

  const statusConfig = getStatusConfig();

  const navigate = useNavigate();

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .payment-container {
          background-color: #f8fafc;
          min-height: 100vh;
          padding: 2rem 1rem;
        }

        .main-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .header-section {
          background: white;
          border-radius: 12px;
          border: 2px solid ${statusConfig.borderColor};
          margin-bottom: 1.5rem;
          overflow: hidden;
        }

        .status-bar {
          background-color: ${statusConfig.bgColor};
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #e2e8f0;
        }

        .status-content {
          padding: 2rem;
          text-align: center;
        }

        .status-icon-success {
          color: #22c55e;
          margin-bottom: 1rem;
        }

        .status-icon-warning {
          color: #f59e0b;
          margin-bottom: 1rem;
        }

        .status-icon-error {
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .status-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .status-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .amount-display {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 2rem;
          display: inline-block;
          min-width: 200px;
        }

        .amount-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .amount-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background-color: #2563eb;
          color: white;
          text-decoration: none;
        }

        .btn-secondary {
          background-color: white;
          color: #64748b;
          border-color: #e2e8f0;
        }

        .btn-secondary:hover {
          background-color: #f8fafc;
          border-color: #cbd5e1;
          color: #475569;
          text-decoration: none;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .detail-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .detail-card-header {
          background-color: #f8fafc;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 600;
          color: #1e293b;
          font-size: 1.1rem;
        }

        .detail-card-body {
          padding: 1.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .detail-row:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .detail-label {
          font-weight: 500;
          color: #64748b;
          font-size: 0.9rem;
          min-width: 100px;
        }

        .detail-value {
          color: #1e293b;
          font-weight: 600;
          text-align: right;
          flex: 1;
          margin-left: 1rem;
          word-break: break-word;
        }

        .copyable-field {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .copy-btn {
          padding: 0.25rem;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .copy-btn:hover {
          background-color: #f1f5f9;
          color: #3b82f6;
        }

        .copy-btn.copied {
          color: #22c55e;
        }

        .quick-actions {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 1.5rem;
        }

        .quick-actions-title {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .quick-action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .quick-action-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: #475569;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .quick-action-btn:hover {
          background-color: #e2e8f0;
          color: #334155;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .payment-container {
            padding: 1rem 0.5rem;
          }

          .status-content {
            padding: 1.5rem 1rem;
          }

          .status-title {
            font-size: 1.5rem;
          }

          .amount-value {
            font-size: 1.5rem;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .detail-value {
            text-align: left;
            margin-left: 0;
          }

          .quick-action-buttons {
            justify-content: center;
          }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="payment-container">
        <div className="main-wrapper fade-in">
          {/* Header Section */}
          <div className="header-section">
            <div className="status-bar">
              <small
                style={{ color: statusConfig.textColor, fontWeight: "600" }}
              >
                Transaction {paymentData.order_status.toUpperCase()}
              </small>
            </div>
            <div className="status-content">
              {statusConfig.icon}
              <h1 className="status-title">{statusConfig.title}</h1>
              <p className="status-subtitle">{statusConfig.subtitle}</p>

              <div className="amount-display">
                <div className="amount-label">
                  Amount {isSuccess ? "Paid" : "Attempted"}
                </div>
                <div className="amount-value">{paymentData.amount}</div>
              </div>

              <div className="action-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <ArrowLeft size={18} />
                  Back to Dashboard
                </button>
                {isSuccess && (
                  <button className="btn btn-secondary">
                    <Download size={18} />
                    Download Receipt
                  </button>
                )}
                {!isSuccess && (
                  <button className="btn btn-secondary">
                    <Eye size={18} />
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="details-grid">
            {/* Transaction Details */}
            <div className="detail-card">
              <div className="detail-card-header">Transaction Details</div>
              <div className="detail-card-body">
                <div className="detail-row">
                  <span className="detail-label">Order ID</span>
                  <div className="detail-value copyable-field">
                    {paymentData.order_id}
                    <button
                      className={`copy-btn ${
                        copiedField === "order_id" ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(paymentData.order_id, "order_id")
                      }
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Transaction ID</span>
                  <div className="detail-value copyable-field">
                    {paymentData.tracking_id}
                    <button
                      className={`copy-btn ${
                        copiedField === "tracking_id" ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(paymentData.tracking_id, "tracking_id")
                      }
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date & Time</span>
                  <span className="detail-value">{paymentData.trans_date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method</span>
                  <span className="detail-value">
                    {paymentData.payment_mode}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Bank/Card</span>
                  <span className="detail-value">{paymentData.card_name}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="detail-card">
              <div className="detail-card-header">Customer Information</div>
              <div className="detail-card-body">
                <div className="detail-row">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">
                    {paymentData.billing_name}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">
                    {paymentData.billing_email}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">
                    {paymentData.billing_tel}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Address</span>
                  <span className="detail-value">
                    {paymentData.billing_address}
                    <br />
                    {paymentData.billing_city}, {paymentData.billing_state}
                    <br />
                    {paymentData.billing_zip}, {paymentData.billing_country}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="quick-actions-title">Need Help?</h3>
            <div className="quick-action-buttons">
              <a href="#" className="quick-action-btn">
                <Phone size={16} />
                Call Support
              </a>
              <a href="#" className="quick-action-btn">
                <Mail size={16} />
                Email Support
              </a>
              <a href="#" className="quick-action-btn">
                <Eye size={16} />
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentStatus2;
