'use client';

import type React from 'react';

import { useState } from 'react';
import { Input } from '@components/atoms/input';
import { Label } from '@components/atoms/label';
import AuthForm from '@components/AuthForm';
import Link from 'next/link';
import { Button } from '../_components/atoms/button';

export default function Page() {
  const [signupData, setSignupData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      if (e.target.name === 'confirmPassword' && signupData.password !== e.target.value) {
        setError('Passwords do not match');
      } else if (
        e.target.name === 'password' &&
        signupData.confirmPassword &&
        signupData.confirmPassword !== e.target.value
      ) {
        setError('Passwords do not match');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
      .then((res) => res.json())
      .then(({ data, error }) => {
        if (error) {
          return setError(error);
        }
        window.location.href = '/confirmemail';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className="w-full h-full flex justify-center">
      <AuthForm
        title="Sign Up"
        description="Create a new account to get started"
        submitText="Create Account"
        onSubmit={handleSubmit}
        footer={
          <>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="font-bold hover:underline">
                Login
              </Link>
            </p>
            <p className="text-center text-sm">
              Go to{' '}
              <Button
                variant="link"
                onClick={() => (window.location.href = '/')}
                className="font-bold hover:underline px-0"
              >
                Home
              </Button>
            </p>
          </>
        }
      >
        <div className="space-y-2">
          <Label htmlFor="email" className="">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={signupData.email}
            onChange={handleChange}
            className="border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username" className="">
            Student ID
          </Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter your student ID"
            value={signupData.username}
            onChange={handleChange}
            className="border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={signupData.password}
            onChange={handleChange}
            className="border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={signupData.confirmPassword}
            onChange={handleChange}
            className="border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </AuthForm>
    </main>
  );
}
