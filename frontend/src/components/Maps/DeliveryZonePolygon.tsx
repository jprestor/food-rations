import { forwardRef } from 'react';
import { Polygon } from '@pbe/react-yandex-maps';

const DeliveryZonePolygon = forwardRef(
  (
    {
      geometry,
      zoneId,
      color,
      onClick,
    }: {
      geometry: number[];
      zoneId: number;
      color: string;
      onClick?: (e: any, zoneId: number) => void;
    },
    ref,
  ) => {
    return (
      <Polygon
        instanceRef={ref as any}
        geometry={geometry}
        options={{
          fillColor: color,
          fillOpacity: 0.25,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWidth: 0.5,
          strokeStyle: 'solid',
        }}
        onClick={(e: any) => onClick?.(e, zoneId)}
      />
    );
  },
);
DeliveryZonePolygon.displayName = 'DeliveryZonePolygon';

export default DeliveryZonePolygon;
