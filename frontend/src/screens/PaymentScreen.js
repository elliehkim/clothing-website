import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPage from '../components/PaymentPage';

const stripePromise = loadStripe('pk_test_51NJVlgK7OSOLxLoxDdqP99eSfNHNEBWnlyaC3PFZZusZ17FRXOM7rT1ebMCA06ThRrv8JQVHm8gPDQy1qLgDryhA00w53sa8dS');

const PaymentScreen = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentPage />
    </Elements>
  );
};

export default PaymentScreen;
