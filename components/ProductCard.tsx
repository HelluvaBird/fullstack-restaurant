import Image from 'next/image';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

interface ProductCardProps {
  id: string;
  img: string | null;
  title: string;
  description: string;
  price: number;
}

export default function ProductCard({
  id,
  img,
  title,
  description,
  price,
}: ProductCardProps) {
  return (
    <div className="h-[50vh] flex flex-col items-center justify-around p-4 hover:bg-green-50 transition-colors">
      {img && (
        <div className="relative flex-1 w-full">
          <Image
            src={img}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <h3 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
          {title}
        </h3>
        <p className="p-4 2xl:p-8">{description}</p>
        <span className="text-xl font-bold">${(price / 100).toFixed(2)}</span>
        <Link
          href={`/product/${id}`}
          className="bg-red-500 text-white p-2 rounded-md group"
        >
          <p className="flex items-center gap-1 group-hover:text-green-200 transition-colors">
            <PlusCircleIcon className="w-5 h-5 " /> <span>Order Now</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
