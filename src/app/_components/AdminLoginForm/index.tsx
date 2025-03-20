'use client';

import type React from 'react';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@components/atoms/card';
import { Button } from '@components/atoms/button';
import { Input } from '@components/atoms/input';
import { Label } from '@components/atoms/label';
import { login } from '@/app/admin/actions';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    login(form);
    setUsername('');
    setPassword('');
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <span className="text-3xl font-bold tracking-tight uppercase">500 Books of Summer</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Sign In</h2>
        </div>
      </CardHeader>
      <CardContent>
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
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
