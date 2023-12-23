'use client';

import { memo } from 'react';

interface ISvg {
  id: string;
  width: string | number;
  height: string | number;
  path?: string;
  fill?: string;
  className?: string;
}

const Svg: React.FC<ISvg> = memo(
  ({ id, width, height, path = '/icons/sprite.svg', fill, className }) => {
    return (
      <svg
        width={width}
        height={height}
        fill={fill}
        className={className}
        dangerouslySetInnerHTML={{
          __html: `<use href=${path}#${id} />`,
        }}
      />
    );
  },
);

Svg.displayName = 'Svg';

export default Svg;
