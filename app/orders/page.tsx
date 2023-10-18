'use client';

import { PencilIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [router, status]);

  const { isLoading, data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch('/api/orders');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data);
      }
      const data = await res.json();
      return data;
    },
    enabled: status === 'authenticated',
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch('/api/orders/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    const status = (
      (e.target as HTMLFormElement).elements[0] as HTMLInputElement
    ).value;

    mutation.mutate({ id, status });
    toast.success('Order has been updated');
  };

  if (isLoading || status === 'loading')
    return (
      <div className="pt-16 flex-1 p-4 lg:px-20 xl:px-40 flex items-center justify-center">
        Loading...
      </div>
    );

  return status === 'authenticated' ? (
    <div className="pt-16 flex-1 p-4 flex justify-center">
      <div className="w-full max-w-7xl">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr className="text-left">
              <th>Order ID</th>
              <th className="hidden md:table-cell">Date</th>
              <th className="hidden md:table-cell">Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item: any) => (
              <tr
                key={item.id}
                className={`${
                  item.status === 'delivered'
                    ? 'bg-green-50'
                    : item.status === 'Not Paid'
                    ? 'bg-red-50'
                    : 'bg-gray-50'
                }`}
              >
                <td className="py-6 px-1">
                  <Link
                    href={`/orders/${item.id}`}
                    className="text-red-500 underline"
                  >
                    {item.id}
                  </Link>
                </td>
                <td className="hidden md:table-cell py-6 px-1">
                  {new Date(item.createdAt).toLocaleDateString('en-us', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="hidden md:table-cell py-6 px-1">
                  ${(item.price / 100).toFixed(2)}
                </td>
                {session.user.isAdmin && item.status === 'Being prepared!' ? (
                  <td>
                    <form
                      className="flex items-center justify-center gap-4"
                      onSubmit={(e) => handleUpdate(e, item.id)}
                    >
                      <input
                        placeholder={item.status}
                        className="p-2 ring-1 ring-red-100 rounded-md"
                      />
                      <button className="bg-red-400 p-2 rounded-full">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </form>
                  </td>
                ) : (
                  <td className="py-6 px-1">{item.status}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : null;
}
