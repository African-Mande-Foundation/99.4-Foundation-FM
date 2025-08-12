import { Suspense } from 'react';
import LoadingBar from '../ui/LoadingBar';
import ResetPasswordForm from './ResetPasswordForm';


export default function ResetPasswordPage() {

  return (
    <Suspense fallback={<LoadingBar />}>
      <ResetPasswordForm />
    </Suspense>
  );
}