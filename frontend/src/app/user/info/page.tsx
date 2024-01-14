import { type Metadata } from 'next';

import FormUser from './FormUser';

const title = 'Личные данные | Кабинет';

export const metadata: Metadata = {
  title,
};

export default function UserInfoPage() {
  return (
    <>
      <FormUser />
    </>
  );
}
