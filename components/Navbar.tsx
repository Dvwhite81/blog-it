'use client';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const { loggedInUser } = useAppContext();

  console.log('loggedInUser:', loggedInUser);
  return (
    <div className="relative flex h-20 justify-between items-center bg-black text-white font-bold capitalize px-8">
      <div>
        {loggedInUser ? (
          <Link href="/blogs">your blogs</Link>
        ) : (
          <Link href="/register">sign up</Link>
        )}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link href="/">
          <Image
            src={'/blog-oval-2.png'}
            alt="blog it"
            height={100}
            width={150}
            className="py-2"
          />
        </Link>
      </div>
      <div>
        {loggedInUser ? (
          <Link href="/create">add blog</Link>
        ) : (
          <Link href="/login">log in</Link>
        )}
      </div>
    </div>
  );
}
