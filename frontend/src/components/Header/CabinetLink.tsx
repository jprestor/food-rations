'use client';

import toast from 'react-hot-toast';

import FormLoginByPhone from '@/components/FormLoginByPhone';
import { Link, Svg, Modal } from '@/ui';
import { useIsAuthenticated, useLogout } from '@/models/user';
import { NAV } from '@/constants';

export default function CabinetLink() {
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();

  const onLogout = async () => {
    await logout.mutateAsync();
    toast('Вы вышли из личного кабинета');
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="dropdown dropdown-end z-10">
          <label
            tabIndex={0}
            className="link text-base-content flex h-10 w-10 items-center justify-center rounded-[50%] bg-base-100"
          >
            <Svg id="user" width="16" height="19" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content mt-2 w-64 overflow-hidden rounded-lg bg-base-100"
          >
            <li>
              <Link className="hover:bg-gray_4 block p-4" to={NAV.userInfo}>
                Мои данные
              </Link>
            </li>
            <li>
              <Link className="hover:bg-gray_4 block p-4" to={NAV.userOrders}>
                Мои заказы
              </Link>
            </li>
            <li>
              <a className="hover:bg-gray_4 block p-4" onClick={onLogout}>
                Выйти
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <Modal
          innerStyle="p-8"
          size="sm"
          toggle={
            <a className="link text-base-content h-10 w-20 font-semibold flex-center rounded-2xl bg-base-100">
              Войти
            </a>
          }
        >
          <FormLoginByPhone />
        </Modal>
      )}
    </>
  );
}
