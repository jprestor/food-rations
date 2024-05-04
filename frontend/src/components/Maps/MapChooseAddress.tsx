import { useState, useRef } from 'react';
import { Map } from '@pbe/react-yandex-maps';
import cn from 'classnames';

import DeliveryZonePolygon from './DeliveryZonePolygon';
import { useDeliveryData } from '@/models/misc';
import {
  useSelectDeliveryAddress,
  useDeliveryAddressString,
} from '@/models/order';

export default function MapChooseAddress({
  className,
  zoom = 11,
}: {
  className?: string;
  zoom?: number;
}) {
  const ymaps = useRef<any>(null);
  const placemarkRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const polygonRefs = useRef<any[]>([]);
  const deliveryData = useDeliveryData();
  const [error, setError] = useState<string | null>(null);
  const setDeliveryData = useSelectDeliveryAddress();
  const initialAddress = useDeliveryAddressString().data;

  const onSelectAddressOnMap = ({
    street,
    house,
    coords,
    isInsideDeliveryZone,
  }: {
    street: string;
    house: string;
    coords: number[];
    isInsideDeliveryZone: boolean;
  }) => {
    if (!isInsideDeliveryZone) {
      setError('К сожалению адрес находится вне зоны нашей доставки');
    } else {
      setError(null);
      setDeliveryData.mutateAsync({ address: { street, house }, coords });
    }
  };

  const createPlacemark = (coords: any) =>
    new ymaps.current.Placemark(
      coords,
      { iconCaption: 'Нет данных' },
      { /* preset: 'islands#blackCircleDotIcon', */ draggable: true },
    );

  const checkIsPointInsidePolygons = (coords: number[]) =>
    polygonRefs.current.some((polygon) => polygon.geometry.contains(coords));

  const getAddress = async (coords: number[]) => {
    const res = await ymaps.current.geocode(coords);
    const firstGeoObject = res.geoObjects.get(0);
    const street = firstGeoObject.getThoroughfare()?.replace?.('улица ', '');
    const house = firstGeoObject.getPremiseNumber() || '';
    const addressString = [street, house].filter(Boolean).join(', ');
    placemarkRef.current.properties.set({
      iconCaption: addressString,
    });
    const isInsideDeliveryZone = checkIsPointInsidePolygons(coords);
    onSelectAddressOnMap({ street, house, coords, isInsideDeliveryZone });

    const suggestInput = document.getElementById('suggest') as HTMLInputElement;
    if (suggestInput) {
      suggestInput.value = addressString;
    }
  };

  const setPlacemarkPosition = (coords: any) => {
    if (placemarkRef.current) {
      placemarkRef.current.geometry.setCoordinates(coords);
      getAddress(coords);
    } else {
      placemarkRef.current = createPlacemark(coords);
      mapRef.current.geoObjects.add(placemarkRef.current);
      placemarkRef.current.events.add('dragend', () => {
        getAddress(placemarkRef.current.geometry.getCoordinates());
      });
    }
  };

  const onMapClick = (e: any, zoneId: number) => {
    const coords = e.get('coords');
    setPlacemarkPosition(coords);
  };

  const onSuggestionSelect = async (e: any) => {
    const { value } = e.get('item');
    const res = await ymaps.current.geocode(`Казань, улица ${value}`);
    const firstGeoObject = res.geoObjects.get(0);
    const coords = firstGeoObject.geometry._coordinates;
    setPlacemarkPosition(coords);
  };

  return (
    <>
      <Map
        className={cn('h-96 w-full overflow-hidden rounded-lg', className)}
        modules={['Placemark', 'geocode', 'SuggestView', 'suggest']}
        instanceRef={mapRef}
        onLoad={(ymapsInstance) => {
          ymaps.current = ymapsInstance;
          const suggestInput = document.getElementById('suggest');

          if (suggestInput) {
            const suggestView = new (ymapsInstance as any).SuggestView(
              'suggest',
              {
                provider: {
                  suggest(request: any, options: any) {
                    return ymapsInstance
                      .suggest(`Казань, улица ${request}`, { results: 10 })
                      .then((items: any) => {
                        const mappedItems = items.map((item: any) => {
                          const displayName = item.displayName
                            .replace('улица ', '')
                            .replace(', Казань, Республика Татарстан', '');
                          const value = displayName;
                          return { ...item, displayName, value };
                        });
                        return mappedItems;
                      });
                  },
                },
              },
            );

            suggestView.events.add('select', onSuggestionSelect);
          }

          if (initialAddress) {
            ymaps.current
              .geocode(`Казань, улица ${initialAddress}`)
              .then((res: any) => {
                const firstGeoObject = res.geoObjects.get(0);
                const coords = firstGeoObject.geometry._coordinates;
                setPlacemarkPosition(coords);
              });
          }
        }}
        state={{
          center: deliveryData?.mapCenter,
          zoom,
        }}
      >
        {deliveryData?.zonePrices.map(({ id, polygon, color }, idx) => (
          <DeliveryZonePolygon
            geometry={polygon}
            zoneId={id}
            color={color}
            onClick={onMapClick}
            ref={(el) => (polygonRefs.current[idx] = el) as any}
            key={id}
          />
        ))}
      </Map>

      {error && <div className="text-alert pt-[5px] text-sm">{error}</div>}
    </>
  );
}
