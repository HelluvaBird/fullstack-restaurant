'use client';

import {
  ArchiveBoxIcon,
  CreditCardIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

export default function OrderPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: session, status } = useSession();
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  const { isLoading, data: order } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${id}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data);
      }
      return res.json();
    },
    enabled: status === 'authenticated',
  });

  const handleReorder = () => {
    if (!order) return;

    order.products.map((product: any) => addToCart(product));
    router.push('/cart');
  };

  const orderColor = new Map();
  orderColor.set('Not Paid', 'rgb(239 68 68)');
  orderColor.set('delivered', 'rgb(34 197 94)');
  orderColor.set('Being prepared!', 'rgb(249 115 22)');

  return (
    <div className="flex-1 p-4 flex justify-center bg-gray-50">
      {isLoading || status === 'loading' ? (
        <div className="w-full max-w-7xl">Loading...</div>
      ) : (
        <div className="w-full max-w-7xl">
          <div className="flex flex-wrap justify-between mb-8">
            <p className="text-xl md:text-3xl lg:text-4xl">Order: {id}</p>
            {order.status === 'delivered' || order.status === 'cancelled' ? (
              <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={handleReorder}
              >
                Reorder
              </button>
            ) : null}
            {order.status === 'Not Paid' ? (
              <div className="grid gap-1">
                <button
                  type="button"
                  className="block px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={() => router.push(`/pay/${order.id}`)}
                >
                  Pay now
                </button>
                <button
                  type="button"
                  className="block text-green-500 border border-green-500 bg-transparent px-4 py-2 rounded-md"
                  onClick={() => router.push(`/orders/${order.id}/cancel`)}
                >
                  Cancel Order
                </button>
              </div>
            ) : null}
            {order.status === 'Being prepared!' ? (
              <button
                type="button"
                className="block text-green-500 border border-green-500 bg-transparent px-4 py-2 rounded-md"
                onClick={() => router.push(`/orders/${order.id}/cancel`)}
              >
                Cancel Order
              </button>
            ) : null}
          </div>
          <div>
            <p className="flex items-center gap-4">
              <ArchiveBoxIcon className="w-6 h-6" />
              <span>Order Details</span>
            </p>
          </div>
          <div className="shadow-md mb-8">
            <div className="p-2 bg-gray-200 flex gap-4">
              <p className="grid">
                <span className="text-green-400">Order Date</span>
                <span>
                  {Intl.DateTimeFormat('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }).format(new Date(order.createdAt))}
                </span>
              </p>
              <div className="border-l-[0.5px] border-gray-700"></div>
              <div className="grid">
                <span className="text-green-400">Status</span>
                <div className="flex items-center gap-1">
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: orderColor.has(order.status)
                        ? orderColor.get(order.status)
                        : '#333',
                    }}
                  ></span>
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
              <div className="border-l-[0.5px] border-gray-700"></div>
              <p className="grid">
                <span className="text-green-400">Type</span>
                <span>One-Time</span>
              </p>
              <EllipsisHorizontalIcon className="hidden sm:block ms-auto w-8 h-8" />
            </div>
            <div className="p-2">
              {order.products.map((item: any) => (
                <div key={item.id} className="flex items-center">
                  <div className="flex items-center gap-x-10 gap-y-1 flex-wrap">
                    <div className="relative h-[100px] w-[100px]">
                      <Image src={item.img} alt="" fill priority sizes="33vw" />
                    </div>
                    <div>
                      <p>{item.title}</p>
                      <p className="text-sm">{item.optionTitle}</p>
                    </div>
                  </div>
                  <div className="ms-auto flex items-center gap-1 flex-wrap">
                    <p className="text-sm">{item.quantity} X</p>
                    <p>
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'usd',
                      }).format(item.price / 100)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="flex items-center gap-4">
              <CreditCardIcon className="w-6 h-6" />
              <span>Charge Details</span>
            </p>
          </div>
          <div className="shadow-md">
            <div className="p-2 bg-gray-200 flex gap-4">
              <p className="grid">
                <span className="text-green-400">Charge Date</span>
                <span>
                  {Intl.DateTimeFormat('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }).format(new Date(order.createdAt))}
                </span>
              </p>
              <div className="border-l-[0.5px] border-gray-700"></div>
              <div className="grid">
                <span className="text-green-400">Status</span>
                <div className="flex items-center gap-1">
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: orderColor.has(order.status)
                        ? orderColor.get(order.status)
                        : '#333',
                    }}
                  ></span>
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
              <div className="border-l-[0.5px] border-gray-700"></div>
              <p className="grid">
                <span className="text-green-400">Type</span>
                <span>One-Time</span>
              </p>
              <EllipsisHorizontalIcon className="hidden sm:block ms-auto w-8 h-8" />
            </div>
            <div className="p-2 border-b-[0.5px] border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10 gap-y-1 flex-wrap">
                  <p>Subtotal</p>
                  <p>{order.products.length} items</p>
                </div>
                <p>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'usd',
                  }).format(
                    order.products.reduce(
                      (
                        accum: number,
                        curr: { price: number; quantity: number }
                      ) => accum + curr.price * curr.quantity,
                      0
                    ) / 100
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Taxes</p>
                <p>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'usd',
                  }).format(0)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10 gap-y-1 flex-wrap">
                  <p>Shipping</p>
                  <p>Priority</p>
                </div>
                <p>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'usd',
                  }).format(0)}
                </p>
              </div>
            </div>
            <div className="p-2 flex items-center justify-between">
              <p className="text-lg font-medium ">Total</p>
              <p>
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'usd',
                }).format(
                  order.products.reduce(
                    (
                      accum: number,
                      curr: { price: number; quantity: number }
                    ) => accum + curr.price * curr.quantity,
                    0
                  ) / 100
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
