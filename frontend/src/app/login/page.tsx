import { type Metadata } from 'next';

import FormLogin from '@/components/FormLogin';

export const metadata: Metadata = {
  title: 'Воити в личный кабинет',
};

export default function LoginPage() {
  return (
    <div className="container flex items-center pt-32">
      <FormLogin />
    </div>
  );
}
