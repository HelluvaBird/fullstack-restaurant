'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CartIcon from './CartIcon';

const links = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'Menu', url: '/menu' },
  { id: 3, title: 'Working Hours', url: '/' },
  { id: 4, title: 'Contact', url: '/' },
];

export default function Menu() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {isMenuOpen ? (
        <XMarkIcon className="w-5 h-5" onClick={() => setIsMenuOpen(false)} />
      ) : (
        <Bars3Icon className="w-5 h-5" onClick={() => setIsMenuOpen(true)} />
      )}
      {isMenuOpen ? (
        <div className="bg-red-500 text-white absolute left-0 top-12 w-full bottom-0 flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <Link
            href={session?.user ? '/orders' : '/login'}
            onClick={() => setIsMenuOpen(false)}
          >
            {session?.user ? 'Orders' : 'Login'}
          </Link>

          <div className="cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            <CartIcon />
          </div>
        </div>
      ) : null}
    </div>
  );
}
