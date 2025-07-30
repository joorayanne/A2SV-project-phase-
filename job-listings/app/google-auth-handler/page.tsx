'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function GoogleAuthHandler() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
  const generatePassword = (email: string) => {
    return btoa(email).slice(0, 20);
  };

  const registerWithBackend = async () => {
    console.log('Status:', status);
    console.log('Session:', session);

    if (status === 'authenticated' && session?.user?.email) {
      const { email, name } = session.user;
      const password = generatePassword(email);
      console.log('Attempting login for', email);

      try {
        const loginRes = await axios.post('https://akil-backend.onrender.com/login', {
          email,
          password,
        });

        console.log('Login success:', loginRes.data);
        localStorage.setItem('token', loginRes.data.token);
        localStorage.setItem('emailForVerification', email);
        router.push('/verify-email');
      } catch (loginErr) {
        console.warn('Login failed, trying signup:', loginErr);

        try {
          const signupRes = await axios.post('https://akil-backend.onrender.com/signup', {
            name,
            email,
            password,
            confirmPassword: password,
            role: 'user',
          });

          console.log('Signup success:', signupRes.data);

          const loginRes = await axios.post('https://akil-backend.onrender.com/login', {
            email,
            password,
          });

          localStorage.setItem('token', loginRes.data.token);
          localStorage.setItem('emailForVerification', email);
          router.push('/verify-email');
        } catch (signupErr: any) {
            const errMsg = signupErr.response?.data?.message || signupErr.message;
            console.error('Signup failed:', errMsg);
            alert(`Google Sign Up failed: ${errMsg}`);
            setTimeout(() => {
              router.push('/signup');
            }, 100); 
          }

      }
    } else {
      console.log('User not authenticated or session not ready');
    }
  };

  registerWithBackend();
}, [session, status]);


  return <p className="text-center mt-10">Signing you in...</p>;
}
