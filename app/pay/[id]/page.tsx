'use client';

import { useEffect, useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Props {
  params: {
    id: string;
  };
}

export default function PayPage({ params: { id } }: Props) {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createIntent = async () => {
      const res = await fetch('/api/create-intent/' + id, {
        method: 'POST',
      });

      const data = await res.json();
      if (res.ok) {
        setClientSecret(data);
      } else {
        setError(data);
      }
    };

    createIntent();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'flat',
    },
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-4 lg:px-20 xl:px-40">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : error ? (
        <p className="text-center">{error}</p>
      ) : null}
    </div>
  );
}
