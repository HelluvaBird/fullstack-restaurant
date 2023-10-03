'use client';

import { useCart } from '@/hooks/useCart';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function CartIcon() {
  const { data: session } = useSession();
  const { getCartQuantity } = useCart();

  return (
    <Link href={session?.user.isAdmin ? '/add' : '/cart'}>
      <div className="flex items-center gap-1">
        {session?.user.isAdmin ? (
          <button
            type="button"
            className="p-1 bg-red-500 text-white rounded-md truncate"
          >
            Add product
          </button>
        ) : (
          <>
            <ShoppingCartIcon className="w-8 h-8 md:w-5 md:h-5" />
            <span>({getCartQuantity()})</span>
          </>
        )}
      </div>
    </Link>
  );
}
