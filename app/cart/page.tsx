'use client';

import { useCart } from '@/hooks/useCart';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, getCartQuantity, getCartTotal, removeFromCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const handleCheckout = async () => {
    if (!session) {
      return router.push('/login');
    }
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: cart,
          price: getCartTotal(),
          status: 'Not Paid',
        }),
      });

      const data = await res.json();
      router.push('/pay/' + data.id);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };
  return (
    <div className="flex-1 text-red-500 grid md:grid-cols-2 max-w-7xl w-full mx-auto">
      <div className="pt-16 px-4 flex flex-col justify-center overflow-auto">
        {cart.length < 1 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 mb-4"
            >
              {item.img && (
                <Image src={item.img} alt="" width={100} height={100} />
              )}
              <div className="grow">
                <h2 className="uppercase text-xl font-bold">{item.title}</h2>
                <p className="text-sm font-semibold">qty: {item.quantity}</p>
                <span>{item.optionTitle}</span>
              </div>
              <h2 className="font-bold">${(item.price / 100).toFixed(2)}</h2>
              <span className="cursor-pointer">
                <XMarkIcon
                  className="w-5 h-5"
                  onClick={() => removeFromCart(item)}
                />
              </span>
            </div>
          ))
        )}
      </div>
      <div className="pt-16 px-4 pb-4 bg-green-50 flex flex-col gap-4 justify-center 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({getCartQuantity()} items)</span>
          <span>${(getCartTotal() / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span>FREE</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL</span>
          <span className="font-bold">
            ${(getCartTotal() / 100).toFixed(2)}
          </span>
        </div>
        <button
          disabled={cart.length < 1}
          type="button"
          className="uppercase bg-red-500 text-white p-3 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
