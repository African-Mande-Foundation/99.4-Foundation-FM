import { Suspense } from 'react';
import LoadingBar from '../ui/LoadingBar';
import RegisterForm from './RegisterForm';

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingBar />}>
      <RegisterForm />
    </Suspense>
  );
}