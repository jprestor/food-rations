'use client';

import { type FileType } from '@/constants';

export default function WidgetExample({
  files,
  className,
}: {
  files: { id: number; file: FileType }[];
  className?: string;
}) {
  return (
    <section className="v-gap" data-name="WidgetExample">
      <div className="container">
        <h3>WidgetExample</h3>
      </div>
    </section>
  );
}
