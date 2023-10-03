import { Products } from '@/components/Featured';
import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';

const getCategory = async (category: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/products?category=${category}`,
    { cache: 'no-store' }
  );

  return res.json();
};

interface Props {
  params: {
    category: string;
  };
}

type CategoryProduct = Omit<Products, 'description' | 'options' | 'createdAt'>;

export default async function CategoryPage({ params: { category } }: Props) {
  const products: CategoryProduct[] = await getCategory(category);

  return (
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
  );
}
