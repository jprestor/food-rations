import { type Metadata } from 'next';

import FormLoginByPhone from '@/components/FormLoginByPhone';

export const metadata: Metadata = {
  title: 'Воити в личный кабинет',
};

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center py-32 md:py-24">
      <div className="max-w-lg p-10 bg-base-100 rounded-lg sm:px-5">
        <FormLoginByPhone />
      </div>
    </div>
  );
}
