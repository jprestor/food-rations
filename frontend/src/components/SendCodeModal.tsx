'use client';

import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';

import { Modal } from '@/ui';
import { sendSmsCode, useLogin } from '@/models/user';
import { cn } from '@/lib';

export default function SendCodeModal({
  name,
  phone,
  isModalOpen,
}: {
  name?: string;
  phone: string;
  isModalOpen: boolean;
}) {
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(false);
  const intervalID = useRef<ReturnType<typeof setInterval>>();
  const login = useLogin();

  const onInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setIsOpen: any,
  ) => {
    setValue(e.target.value);

    if (e.target.value.length === 4) {
      try {
        await login.mutateAsync({ code: e.target.value, phone });
        toast.success('Вы авторизованы');
        setIsOpen(false);
      } catch (error) {
        console.log('error login:', error);
        setError(true);
      }
    }
  };

  const startTimer = async () => {
    setCounter(60);
    sendSmsCode({ name, phone });

    intervalID.current = setInterval(() => {
      setCounter((prev) => {
        if (prev < 2) {
          clearInterval(intervalID.current);
        }

        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isModalOpen) startTimer();
    return () => clearInterval(intervalID.current);
  }, [isModalOpen]);

  return (
    <Modal innerStyle="p-10" size="sm" externalIsOpen={true}>
      {({ setIsOpen }: any) => (
        <div className="text-center">
          <p className="text-xl font-semibold mb-11">Введите полученный код</p>

          <div className={cn('mb-14', error && 'mb-7')}>
            <input
              className={cn('code-input', error && 'is-error')}
              type="text"
              value={value}
              maxLength={4}
              onChange={(e) => onInputChange(e, setIsOpen)}
              placeholder="0000"
            />
            {error && (
              <div className="text-sm text-error mt-2">Некорректный код</div>
            )}
          </div>

          {counter < 1 ? (
            <a className="link text-sm hover:opacity-80" onClick={startTimer}>
              Отправить код повторно
            </a>
          ) : (
            <p className="text-sm text-base-300">
              Новый код можно получить через {counter} сек.
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}
