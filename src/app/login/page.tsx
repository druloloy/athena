'use client';
import { useState } from 'react';
import { Input } from '../_components/atoms/input';
import { Label } from '../_components/atoms/label';
import AuthForm from '../_components/AuthForm';
import Link from 'next/link';
import { Button } from '../_components/atoms/button';
import { toast } from '../_hooks/use-toast';

export default function Page() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    })
      .then((res) => res.json())
      .then(({ data, error }) => {
        if (error) {
          return setError(error);
        }
        toast({
          title: 'Success',
          description: 'You have logged in successfully',
        });
        window.location.href = '/';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <AuthForm
        title="Login"
        description="Login to your account"
        submitText="Login"
        onSubmit={handleSubmit}
        footer={
          <>
            <p className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-bold hover:underline">
                Sign up
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
          <Label htmlFor="username">Student ID</Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter your Student ID"
            value={loginData.username}
            onChange={handleChange}
            className="border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            className="border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </AuthForm>
    </main>
  );
}
