'use client';

import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

import { type Metrics, useMisc } from '@/models/misc';

const metricsHit =
  (yandexId?: string | null, googleId?: string | null) => (url: string) => {
    if (yandexId) {
      (window as any)?.ym(yandexId, 'hit', url);
    }
    if (googleId) {
      ReactGA.pageview(url);
    }
  };

function AdminScript({ jsString }: { jsString?: string | null }) {
  if (!jsString) {
    return null;
  }
  return <Script id="scripts-from-admin">{jsString}</Script>;
}

export default function Metrics() {
  const { data } = useMisc();
  const { googleId, yandexId, jsCode } = data?.metrics || {};
  const mount = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (googleId && !mount.current) {
      ReactGA.initialize(googleId);
      mount.current = true;
    }

    metricsHit(googleId, yandexId)(pathname);
  }, [googleId, yandexId, pathname]);

  return <AdminScript jsString={jsCode} />;
}
