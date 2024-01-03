import { type Metadata } from 'next';

import FormLoginByPhone from '@/components/FormLoginByPhone';

export const metadata: Metadata = {
  title: 'Воити в личный кабинет',
};

export default function LoginPage() {
  return (
    <div className="container flex items-center pt-32">
      <FormLoginByPhone />
    </div>
  );
}
