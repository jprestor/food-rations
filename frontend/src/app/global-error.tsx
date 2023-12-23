'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="my-14 text-center">
          <h1 className="mb-5 text-[80px] font-bold tracking-wide md:text-[55px]">
            Ошибка на сервере
          </h1>

          <button onClick={() => reset()}>Попробовать еще раз</button>
        </div>
      </body>
    </html>
  );
}
