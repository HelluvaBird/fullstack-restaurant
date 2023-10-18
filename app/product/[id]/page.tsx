import { Products } from '@/components/Featured';
import Price from '@/components/Price';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

const getProduct = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`);

  return res.json();
};
export default async function ProductPage({ params: { id } }: Props) {
  const product: Products = await getProduct(id);
  return (
    <div className="pt-16 p-4 flex-1 text-red-500 md:flex-row relative flex md:items-center justify-center">
      <div className="max-w-7xl flex flex-col md:flex-row md:gap-8 md:items-center">
        {product.img && (
          <div className="flex-1">
            <div className="relative h-[500px]">
              <Image
                src={product.img}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
          </div>
        )}
        <div className="h-1/2 flex-1 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
          <h2 className="text-3xl font-bold uppercase">
            <span>{product.title}</span>
          </h2>
          <p>{product.description}</p>
          <Price {...product} />
        </div>
      </div>
    </div>
  );
}
