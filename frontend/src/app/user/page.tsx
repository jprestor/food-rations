import { permanentRedirect } from 'next/navigation';
import { NAV } from '@/constants';

export default function UserPage() {
  permanentRedirect(NAV.userInfo);
}
