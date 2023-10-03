// export default function page() {
//   return null;
// }

import Link from 'next/link';
import Image from 'next/image';
import { Products, getFeatured } from '@/components/Featured';
import { StarIcon } from '@heroicons/react/20/solid';

// interface Category {
//   id: string;
//   title: string;
//   img: string;
//   slug: string;
//   description: string;
//   color: string;
// }

// const getCategories = async () => {
//   const res = await fetch('http://localhost:3000/api/categories', {
//     cache: 'no-cache',
//   });

//   return await res.json();
// };

interface Props {
  searchParams: {
    [key: string]: string;
  };
}

export default async function MenuPage({ searchParams: { category } }: Props) {
  // const categories: Category[] = await getCategories();
  const products = await getFeatured(category);
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid sm:flex min-h-[300px] border shadow-md text-red-500"
            >
              <div className="relative h-[250px] sm:h-auto sm:w-1/2">
                <Image
                  src={product.img || ''}
                  alt=""
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{product.title}</h2>
                  {product.isFeatured ? (
                    <div className="inline-flex gap-1 items-center px-3 bg-gray-200 rounded-full">
                      <StarIcon className="w-5 h-5" />
                      <p>Bestseller</p>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <p>
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'usd',
                    }).format(product.price / 100)}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    className="w-full text-center py-2 px-4 bg-red-500 text-white rounded-md"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// {categories.map((category) => (
//   <Link
//     key={category.id}
//     href={`/menu/${category.slug}`}
//     className="w-full h-[500px] bg-cover bg-right p-8 md:h-[600px] relative group"
//     style={{ backgroundImage: `url(${category.img})` }}
//   >
//     <div className="absolute inset-0 p-8 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
//       <div className={`w-1/2 text-white`}>
//         <h2 className="uppercase font-bold text-3xl">
//           {category.title}
//         </h2>
//         <p className="text-sm my-8">{category.description}</p>
//         <button
//           type="button"
//           className={`hidden 2xl:block text-${
//             category.color === 'black' ? 'white' : 'red-500'
//           } py-2 px-4 rounded-md`}
//           style={{ backgroundColor: category.color }}
//         >
//           Explore
//         </button>
//       </div>
//     </div>
//   </Link>
// ))}
