'use client';

import { useState } from 'react';
import { Products } from './Featured';
import { useCart } from '@/hooks/useCart';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Price({ id, title, img, price, options }: Products) {
  const { data: session } = useSession();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { addToCart } = useCart();

  const handleCart = () => {
    addToCart({
      id,
      title,
      img,
      price:
        price +
        ((options?.length && options[selected].additionalPrice * 100) || 0),
      ...(options?.length && {
        optionTitle: options[selected].title,
      }),
      quantity,
    });
    toast.success('Added to cart');
  };

  const handleQuantity = (num: number) => {
    setQuantity((prev) => {
      const q = prev + num;
      if (q < 1) {
        return 1;
      } else if (q > 9) {
        return 9;
      } else {
        return prev + num;
      }
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">
        $
        {(
          (price +
            ((options?.length && options[selected].additionalPrice * 100) ||
              0)) /
          100
        ).toFixed(2)}
      </h2>
      {session ? (
        <>
          <div className="flex gap-4">
            {options && options?.length > 0
              ? options?.map((option, index) => (
                  <button
                    type="button"
                    key={option.title}
                    className="min-w-[6rem] p-2 ring-1 ring-green-400 rounded-md"
                    style={{
                      backgroundColor:
                        selected === index ? 'rgb(74 222 128)' : 'white',
                      color: selected === index ? 'white' : 'rgb(74 222 128)',
                    }}
                    onClick={() => setSelected(index)}
                  >
                    {option.title}
                  </button>
                ))
              : null}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-between flex-1 p-3 ring-1 ring-red-500">
              <span>Quantity</span>
              <div className="flex gap-4 items-center">
                <button type="button">
                  <MinusIcon
                    className="w-5 h-5"
                    onClick={() => handleQuantity(-1)}
                  />
                </button>
                <span>{quantity}</span>
                <button type="button">
                  <PlusIcon
                    className="w-5 h-5"
                    onClick={() => handleQuantity(1)}
                  />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="uppercase bg-red-500 text-white p-3 ring-1 ring-red-500"
              onClick={handleCart}
            >
              Add to Cart
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="uppercase bg-red-500 text-white p-3 ring-1 ring-red-500 w-full md:max-w-xs rounded-md"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      )}
    </div>
  );
}
