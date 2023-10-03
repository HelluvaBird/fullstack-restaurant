import ProductCard from './ProductCard';

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

export const getFeatured = async () => {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });

  return res.json();
};

export default async function Featured() {
  const products: Products[] = await getFeatured();
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
