'use client';
import { Suspense } from 'react';
import LoginPage from '../_components/LoginPage/LoginPage';

export default function Login() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
