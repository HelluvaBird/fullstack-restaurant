import Link from 'next/link';
import Menu from './Menu';
import UserLinks from './UserLinks';
import CartIcon from './CartIcon';

export default function Navbar() {
  return (
    <header className="h-12 p-4 text-red-500 flex items-center justify-center border-b-2 border-b-red-500 uppercase">
      <div className="flex items-center max-w-7xl w-full">
        <div className="hidden md:flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <div className="text-xl md:font-bold md:text-center me-auto md:ms-auto">
          <Link href="/">Maxximu</Link>
        </div>
        <div className="md:hidden">
          <Menu />
        </div>
        <div className="hidden md:flex gap-2 items-center justify-end">
          <CartIcon />
          <UserLinks />
        </div>
      </div>
    </header>
  );
}
