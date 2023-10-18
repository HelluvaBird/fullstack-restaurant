import { DocumentIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

export default function Offer() {
  return (
    <div className="py-12 bg-green-700 md:bg-[url('/images/offer-background.jpg')] md:bg-green-900 bg-blend-multiply bg-cover bg-bottom flex items-center">
      <div className="flex flex-col md:flex-row md:justify-between w-full max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 p-6">
          <h3 className="text-white text-5xl font-bold xl:text-6xl">
            Delicious Burger & Fries
          </h3>
          <p className="text-white xl:text-xl">
            Good stuff served right here everyday
          </p>
          <Link
            href="/menu"
            className="text-white bg-red-500 rounded-md py-3 px-6 self-stretch md:self-auto"
          >
            <span className="flex items-center gap-1 justify-center">
              View Menu <DocumentIcon className="w-5 h-5" />
            </span>
          </Link>
        </div>
        <div className="hidden md:block relative flex-1 w-full h-96">
          <Image
            src="/images/offerProduct.png"
            alt=""
            priority
            fill
            sizes="50vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
