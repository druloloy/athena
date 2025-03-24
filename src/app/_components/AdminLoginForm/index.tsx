'use client';

import type React from 'react';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@components/atoms/card';
import { Button } from '@components/atoms/button';
import { Input } from '@components/atoms/input';
import { Label } from '@components/atoms/label';

export function LoginForm() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('/admin/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        if (error) {
          return setError(error);
        }
        window.location.href = '/admin';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Card className="w-full h-screen flex flex-col justify-center items-center md:h-auto max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <span className="text-3xl font-bold tracking-tight uppercase">500 Books of Summer</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Sign In</h2>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
