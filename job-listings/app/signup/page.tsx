'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert('Passwords do not match');

    try {
      await axios.post('https://akil-backend.onrender.com/signup', form);
      localStorage.setItem('emailForVerification', form.email);
      router.push('/verify-email');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto my-32 p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Sign Up Today!</h1>
      <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/google-auth-handler' })}

          className="btn w-full flex justify-center items-center gap-2 border border-gray-300 hover:bg-gray-100 !bg-white !text-indigo-800 font-semibold"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign Up with Google
      </button>

      <div className="flex items-center gap-4 my-4 text-gray-500">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="whitespace-nowrap">Or Sign Up with Email</span>
        <div className="flex-grow border-t border-gray-300"></div>
    </div>


      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="fullName" className="block text-left font-semibold text-gray-700 mb-1 text-sm">Full Name</label>
        <input name="name" placeholder="Full Name" className="input" onChange={handleChange} required />
        <label htmlFor="email" className='block text-sm font-semibold text-left mb-1 text-gray-700'>Email</label>
        <input name="email" placeholder="Email Address" type="email" className="input" onChange={handleChange} required />
        <label htmlFor="email" className='block text-sm font-semibold text-left mb-1 text-gray-700'>Password</label>
        <input name="password" placeholder="Password" type="password" className="input" onChange={handleChange} required />
        <label htmlFor="email" className='block text-sm font-semibold text-left mb-1 text-gray-700'>Confirm Password</label>
        <input name="confirmPassword" placeholder="Confirm Password" type="password" className="input" onChange={handleChange} required />
        <button className="btn w-full mt-4 !rounded-3xl" type="submit">Continue</button>
      </form>

      <p className="mt-4 text-sm text-left">
        Already have an account? <a href="/login" className="text-indigo-900 font-semibold">Login</a>
      </p>
      <div className='text-left mt-4'>
        <p className='text-grey-200'>By clicking 'Continue', you acknowledge that you have read and accepted our <a href="" className='text-indigo-800 font-medium' >Terms of Service</a> and <a href="" className='text-indigo-800 font-medium'>Privacy Policy</a>.</p>
      </div>
    </div>
  );
}
