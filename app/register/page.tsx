'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const signin = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: '/',
      });
      if (!signin?.error) {
        toast.success('Welcome!');
        router.push(signin?.url!);
      }
    }
  };
  return (
    <div className="flex-1 grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-[500px] w-[95%] md:w-full border border-red-300 p-4 rounded-md"
      >
        <h2 className="text-center text-red-500 text-3xl font-bold mb-4">
          Maxximu
        </h2>
        <div className="space-y-4">
          <div className="grid">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-neutral-100 rounded-md p-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-neutral-100 rounded-md p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-neutral-100 rounded-md p-2"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <button
              type="submit"
              className="bg-red-500 text-white py-3 rounded-md"
            >
              Register
            </button>
          </div>
          <p className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
