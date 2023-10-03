'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Tabs() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-wrap sm:flex-nowrap text-center mb-4">
      <li className="w-full">
        <Link
          href="/menu/pastas"
          className="inline-block w-full p-4 bg-green-500 sm:rounded-l-md text-white"
        >
          <span
            className={`${
              pathname.includes('pastas') ? 'border-b-2' : ''
            } border-green-600 px-4`}
          >
            Pastas
          </span>
        </Link>
      </li>
      <li className="w-full">
        <Link href="/menu/burgers" className="inline-block w-full p-4 ">
          <span
            className={`${
              pathname.includes('burgers') ? 'border-b-2' : ''
            } border-gray-600 px-4`}
          >
            Burgers
          </span>
        </Link>
      </li>
      <li className="w-full">
        <Link
          href="/menu/pizzas"
          className="inline-block w-full p-4 bg-red-500 sm:rounded-r-md text-white"
        >
          <span
            className={`${
              pathname.includes('pizzas') ? 'border-b-2' : ''
            } border-red-700 px-4`}
          >
            Pizza
          </span>
        </Link>
      </li>
    </ul>
  );
}
