'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeContent from './components/HomeContent';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token on HomePage:', token);
    if (!token) {
      router.push('/login');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated === false) {
    return null;
  }

  return <HomeContent />;
}
