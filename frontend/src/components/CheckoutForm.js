import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { createOrder } from '../actions/orderActions'

const CheckoutForm = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice>100? 0: 10).toFixed(2)
    cart.totalPrice= (Number(cart.itemsPrice)+ Number(cart.shippingPrice)).toFixed(2)


    const stripe = useStripe();
    const elements = useElements();
    
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
      
      // setIsLoading(true);

      dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
    }))
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: 'http://localhost:3000/order-complete/',
          receipt_email: email,
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      // setIsLoading(false);

    };
  
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