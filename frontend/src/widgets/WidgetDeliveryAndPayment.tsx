'use client';

import { MapChooseAddress } from '@/components/Maps';
import { useMisc, useMiscRef } from '@/models/misc';

export default function WidgetDeliveryAndPayment() {
  const misc = useMisc();
  const { deliveryData } = misc.data!;
  const { zonePrices, cartAmountForDeliveryDiscount, deliveryDiscountAmount } =
    deliveryData!;
  const [phone] = useMiscRef('phone');
  const [opening, closing] = useMiscRef('openingClosing');
  const [workingDays] = useMiscRef('workingDays');

  return (
    <section className="v-margin mb-24 md:mb-10" data-name="WidgetExample">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="rounded-md bg-base-100 flex flex-col gap-4 p-5">
            <h3 className="text-xl font-medium">
              Доставка платная в завимости от зоны доставки
            </h3>

            <div className="flex flex-col gap-2">
              {zonePrices.map((i) => (
                <div className="flex items-center gap-2" key={i.id}>
                  <span
                    className="w-5 aspect-square rounded-full"
                    style={{ backgroundColor: i.color }}
                  />
                  <span className="text-base-content">{i.name}: </span>
                  <span>{i.cost} ₽</span>
                </div>
              ))}
            </div>

            <p className="text-base-content italic">
              При заказе на сумму от {cartAmountForDeliveryDiscount} ₽, скидка
              на доставку - {deliveryDiscountAmount} ₽
            </p>
          </div>

          <div className="rounded-md bg-base-100 flex flex-col gap-4 p-5">
            <h3 className="text-xl font-medium">Принимаем заказ по телефону</h3>
            <p>
              С {opening} до {closing}, {workingDays}, на сайте и по телефону{' '}
              <a className="link underline" href={`tel:${phone}`}>
                {phone}
              </a>
            </p>
          </div>

          <div className="rounded-md bg-base-100 flex flex-col gap-4 p-5">
            <h3 className="text-xl font-medium">Варианты оплаты</h3>
            <ul className="list-disc pl-4">
              <li>Картой на сайте</li>
            </ul>

            <div className="prose">
              <p>
                Для вашего удобства и безопасности мы предлагаем онлайн-оплату
                заказов. Все платежи обрабатываются через надежный платежный
                сервис ЮКасса (ранее известный как Яндекс.Деньги).
              </p>
              <p>
                ЮКасса обеспечивает максимальную защиту ваших платежных данных,
                соответствуя самым строгим международным стандартам безопасности
                в сфере электронных платежей. Используя передовые технологии
                шифрования и многоуровневую систему защиты, ЮКасса гарантирует
                безопасность каждой транзакции.
              </p>
              <p>
                Оплачивая заказ на нашем сайте, вы можете быть уверены, что ваши
                личные и финансовые данные находятся под надежной защитой. Мы
                ценим ваше доверие и заботимся о вашем спокойствии при каждом
                заказе.
              </p>
            </div>
          </div>
        </div>

        <MapChooseAddress className="mt-10 h-[600px] rounded-xl md:h-[450px]" />
      </div>
    </section>
  );
}
