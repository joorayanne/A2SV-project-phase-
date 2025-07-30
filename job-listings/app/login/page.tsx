'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://akil-backend.onrender.com/login', form);
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto  my-32 p-6">
      <h2 className="text-2xl font-black text-center mb-6">Welcome Back,</h2>

      <div className="flex items-center gap-4 my-4 text-gray-500">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="flex-grow border-t border-gray-300"></div>
    </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
        Email Address
      </label>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="input"
        />
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
        Password 
      </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="btn w-full bg-blue-600 text-white rounded py-2">
          Login
        </button>
      </form>

      <p className="text-sm mt-4 text-left">
        Don’t have an account?{' '}
        <a href="/signup" className="text-indigo-900 font-semibold">
          Sign Up
        </a>
      </p>

      {/* <div className="text-center text-sm my-4 text-gray-500">or</div>

      <button
        onClick={() => signIn('google')}
        className="btn w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded"
      >
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button> */}
    </div>
  );
}
