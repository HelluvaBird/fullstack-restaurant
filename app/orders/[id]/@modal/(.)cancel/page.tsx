'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default function CancelModal({ params: { id } }: Props) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return fetch(`/api/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
    },
  });
  const onClick: React.MouseEventHandler = (e) => {
    if (e.target === overlay.current) {
      router.back();
    }
  };
  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const res = await mutation.mutateAsync(id);
    if (res.ok) {
      queryClient.invalidateQueries(['order', id]);
      router.back();
    }
  };
  return (
    <div
      ref={overlay}
      className="fixed inset-0 bg-black/60 grid place-items-center px-4"
      onClick={onClick}
    >
      <div className="p-4 bg-gray-50 rounded-md relative">
        <h2 className="text-center text-4xl mb-2">Cancel Order</h2>
        <p className="mb-8">
          Are you sure you want to cancel this order.{' '}
          <span className="font-bold">This action cannot be undone</span>
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="bg-green-500 text-[#F8F8F2] py-2 rounded-md"
            onClick={handleCancel}
          >
            Yes, Cancel Order
          </button>
          <button
            type="button"
            className="border border-green-500 text-green-500 py-2 rounded-md"
            onClick={() => router.back()}
          >
            No
          </button>
        </div>
        <XMarkIcon
          className="w-6 h-6 absolute top-2 right-2 cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
    </div>
  );
}
