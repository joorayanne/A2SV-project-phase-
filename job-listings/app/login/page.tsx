'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
      const { accessToken, refreshToken, id, email, role } = res.data.data;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', id);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);

      router.push('/');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto  my-32 p-6">
      <h2 className="text-2xl font-black text-center mb-6">Welcome Back,</h2>

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
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
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
    </div>
  );
}
