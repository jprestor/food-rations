'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/ui';
import { useMiscRef } from '@/models/misc';
import { cookies } from '@/lib';

export default function CookieConsentPrompt() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const visitedSession = cookies.get('visitedSession');

    if (!visitedSession) {
      setIsOpen(true);
    }
  }, []);

  const onClose = () => {
    setIsOpen(false);
    cookies.set('visitedSession', 'true');
  };

  return <div className="fixed bottom-[-50px]"></div>;
}
