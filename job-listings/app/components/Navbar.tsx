'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // update nav instantly
    window.location.href = '/'; // take them back to homepage
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link href="/" className="text-xl font-bold text-blue-700">
        Job Listings
      </Link>
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <Link href="/bookmarks" className="text-blue-700 font-semibold hover:underline">
              Bookmarks
            </Link>
            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-blue-700 font-semibold hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
