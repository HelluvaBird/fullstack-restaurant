'use client';

import { useCart } from '@/hooks/useCart';
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL}/success`,
      },
    });

    if (error) {
      console.log(error.message);
    } else {
      clearCart();
    }

    setIsLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      id="payment-form"
      className="flex-1 flex flex-col gap-8 justify-center w-full max-w-[700px] mx-auto"
    >
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <div>
        <h3>Address</h3>
        <AddressElement
          options={{ mode: 'shipping' }}
          onChange={(event) => {
            if (event.complete) {
              const address = event.value.address;
            }
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="bg-red-500 text-white p-4 rounded-md md:w-28 mt-8 w-full"
        >
          <span id="button-text">{isLoading ? <Spinner /> : 'Pay now'}</span>
        </button>
      </div>
    </form>
  );
}
