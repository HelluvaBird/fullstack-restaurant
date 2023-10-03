import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

interface Props {
  image: string;
  text: string;
  name: string;
  location: string;
}
export default function Testimonial({ image, text, name, location }: Props) {
  return (
    <div className="bg-red-100 h-full mx-auto p-4 grid place-items-center rounded-md">
      <div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8 mb-4">
          <div className="relative w-20 h-20">
            <Image
              src={image}
              alt=""
              fill
              sizes="33vw"
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <p className="text-lg/5">{name}</p>
            <p className="text-sm">{location}</p>
            <p className="flex">
              <span>
                <StarIcon className="w-5 h-5" />
              </span>
              <span>
                <StarIcon className="w-5 h-5" />
              </span>
              <span>
                <StarIcon className="w-5 h-5" />
              </span>
              <span>
                <StarIcon className="w-5 h-5" />
              </span>
              <span>
                <StarIcon className="w-5 h-5" />
              </span>
            </p>
          </div>
        </div>
        <p className="text-xl max-w-sm text-center font-medium">{text}</p>
      </div>
    </div>
  );
}
