import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
      if (!stripe) {
        return ;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe]);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/order-complete/',
          receipt_email: email,
        },
      }).then(() => {
        // Clear cartItems in Redux and local storage
        dispatch({ type: CART_CLEAR_ITEMS });
        localStorage.removeItem('cartItems');
      });

      if (error) {
        setMessage(error.message);
      }
      }
  
    const paymentElementOptions = {
      layout: "tabs"
    }
  
    
    return (
      <ListGroup variant='flush'>
        <ListGroup.Item>
      <form id="payment-form" onSubmit={handleSubmit}>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
       <button className="paynow-btn" id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
        </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
      </form>
      </ListGroup.Item>
      </ListGroup>
    );
  };

export default CheckoutForm;