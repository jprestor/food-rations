import dynamic from 'next/dynamic';

type Data = {
  componentName: string;
};

function createComponent(data: Data, index: number) {
  const { componentName } = data;

  const Component = dynamic(() =>
    import(`@/widgets/${componentName}`).catch((err) => {
      console.log(`Компонент: "${componentName}" не найден`);
      return () => null;
    }),
  );

  Component.displayName = componentName;

  return <Component {...data} key={index} />;
}

export default function DynamicZone({ dynamicZone }: { dynamicZone: any[] }) {
  return <>{dynamicZone.map(createComponent)}</>;
}
