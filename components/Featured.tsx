import ProductCard from './ProductCard';
import { prisma } from '@/lib/prisma';

export interface Products {
  id: string;
  title: string;
  description: string;
  img: string | null;
  price: number;
  isFeatured: boolean;
  options?: { title: string; additionalPrice: number }[];
  categorySlug: string;
  createdAt: Date;
}

export const getFeatured = async (category?: string) => {
  return prisma.product.findMany({
    where: {
      ...(category ? { categorySlug: category } : { isFeatured: true }),
    },
  });
};

export default async function Featured() {
  const products = await getFeatured();
  return (
    <div className="flex justify-center p-4">
      <div className="max-w-7xl w-full">
        <div className="text-red-500">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
