import { type Metadata } from 'next';

import FormUser from './FormUser';

const title = 'Личные данные';

export const metadata: Metadata = {
  title,
};

export default function UserPage() {
  return (
    <>
      <FormUser />
    </>
  );
}
