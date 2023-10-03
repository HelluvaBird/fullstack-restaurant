import Link from 'next/link';

export default function Footer() {
  return (
    <div className="h-12 md:h-24 px-4 text-red-500 flex items-center justify-center border-t-2 border-t-red-500">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <Link href="/" className="font-bold text-xl">
          MAXXIMU
        </Link>
        <p>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  );
}
