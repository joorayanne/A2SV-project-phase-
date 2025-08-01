'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const email = typeof window !== 'undefined' ? localStorage.getItem('emailForVerification') : null;


  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) clearInterval(countdown);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    const updatedCode = [...code];
    updatedCode[index] = value.slice(0, 1); 
    setCode(updatedCode);

    
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = code.join('');
    if (otp.length < 4) {
      alert('Please enter the full OTP');
      return;
    }

    if (!email) {
      alert('No email found. Please go back and try logging in again.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('https://akil-backend.onrender.com/verify-email', {
        email,
        OTP: otp,
      });

      alert('Email verified successfully! You can now log in.');
      router.push('/login');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-32 text-center p-6">
      <h2 className="text-2xl font-black mb-2">Verify Email</h2>
      <p className="text-gray-600 text-sm mb-6 text-left">
        We’ve sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
      </p>

      <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-4">
        {code.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="w-12 h-12 text-xl text-center border rounded focus:outline-blue-500"
          />
        ))}
      </form>

      <p className="text-sm text-gray-500 mb-4">
        You can request to <span className="text-indigo-900 font-semibold cursor-pointer">Resend code</span> in{' '}
        <b>0:{timer < 10 ? `0${timer}` : timer}</b>
      </p>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="btn w-full bg-blue-600 text-white py-2 !rounded-3xl hover:bg-blue-700"
      >
        {loading ? 'Verifying...' : 'Continue'}
      </button>
    </div>
  );
}
