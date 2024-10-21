import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import UserHeader from "../header/UserHeader";

function Payment() {
  const [product] = useState({
    name: "Doctor Appointment",
    price: 200000, // Total Price in LKR
    advance: 5000, // Small amount to charge when using insurance
    productby: "HealthCare",
  });

  const [paymentMode, setPaymentMode] = useState(null); // "card" or "insurance"
  const [insuranceDetails, setInsuranceDetails] = useState({
    provider: "",
    policyNumber: "",
  });
  const [isInsuranceFormValid, setIsInsuranceFormValid] = useState(false);

  // Validate insurance form when fields change
  useEffect(() => {
    const isValid =
      insuranceDetails.provider.trim() !== "" &&
      insuranceDetails.policyNumber.trim() !== "";
    setIsInsuranceFormValid(isValid);
  }, [insuranceDetails]);

  const handleInsuranceDetailsChange = (e) => {
    const { name, value } = e.target;
    setInsuranceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const makePayment = (token) => {
    const body = {
      token,
      product,
      useInsurance: paymentMode === "insurance", // true if paying with insurance
      insuranceDetails,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:5000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <UserHeader />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Doctor Appointment Payment
          </h2>
          <p className="text-lg mb-6 text-center">Price: {product.price} LKR</p>

          {/* Payment Mode Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setPaymentMode("card")}
              className={`px-6 py-2 rounded-lg font-semibold ${
                paymentMode === "card"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              Pay with Card
            </button>
            <button
              onClick={() => setPaymentMode("insurance")}
              className={`px-6 py-2 rounded-lg font-semibold ${
                paymentMode === "insurance"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              Pay with Insurance
            </button>
          </div>

          {/* Insurance Details Form */}
          {paymentMode === "insurance" && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">
                Enter Insurance Details:
              </h4>
              <input
                type="text"
                name="provider"
                placeholder="Insurance Provider"
                value={insuranceDetails.provider}
                onChange={handleInsuranceDetailsChange}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="policyNumber"
                placeholder="Policy Number"
                value={insuranceDetails.policyNumber}
                onChange={handleInsuranceDetailsChange}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          {/* Pay with Card */}
          {paymentMode === "card" && (
            <StripeCheckout
              name="Doctor Appointment"
              amount={product.price * 100} // Stripe expects amount in cents
              currency="LKR"
              token={makePayment}
              stripeKey="pk_test_51Q5kUrKs4ldJ96PWJsuoDCG9WwlLqb5rS6eBXsrdEGMMifKnRIrabnhta1MvPcabDAZEsuf3lK4V3I01d7eUcvWp00o91jsc6s"
            >
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                Pay {product.price} LKR with Card
              </button>
            </StripeCheckout>
          )}

          {/* Pay with Insurance */}
          {paymentMode === "insurance" && (
            <StripeCheckout
              name="Doctor Appointment"
              amount={product.advance * 100} // Only charge the advance when using insurance
              currency="LKR"
              token={makePayment}
              stripeKey="pk_test_51Q5kUrKs4ldJ96PWJsuoDCG9WwlLqb5rS6eBXsrdEGMMifKnRIrabnhta1MvPcabDAZEsuf3lK4V3I01d7eUcvWp00o91jsc6s"
            >
              <button
                disabled={!isInsuranceFormValid}
                className={`w-full text-white py-2 rounded-lg font-semibold transition duration-200 ${
                  isInsuranceFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Pay {product.advance} LKR Advance with Insurance
              </button>
            </StripeCheckout>
          )}
        </div>
      </div>
    </>
  );
}

export default Payment;
