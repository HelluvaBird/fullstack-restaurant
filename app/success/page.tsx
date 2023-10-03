'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get('payment_intent');

  useEffect(() => {
    const confirmOrder = async () => {
      const res = await fetch('/api/confirm/' + payment_intent, {
        method: 'PATCH',
      });

      if (res.ok) {
        setTimeout(() => router.push('/orders'), 5000);
      }
    };

    confirmOrder();
  }, [payment_intent, router]);

  return (
    <div className="flex-1 flex items-center justify-center text-center text-2xl text-green-700">
      <p className="max-w-[600px]">
        Payment Successful. You are being redirected.
      </p>
    </div>
  );
}
