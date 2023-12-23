import Svg from './Svg';

interface ICollapse {
  name: string;
  titleStyle: string;
  defaultOpen: boolean | undefined;
  onChange: () => void;
  children?: React.ReactNode;
  className?: string;
}

function Collapse({
  name,
  titleStyle,
  defaultOpen,
  onChange,
  children,
  className,
}: ICollapse) {
  return (
    <div className={`collapse pt-[16px] ${className}`}>
      <input
        type="checkbox"
        className="peer min-h-0"
        defaultChecked={defaultOpen}
        onChange={onChange}
      />

      <div
        className={`collapse-title text-basic peer-checked:child-svg:-rotate-90 flex min-h-0 items-center p-0 peer-checked:mt-[4px] peer-checked:text-black ${titleStyle}`}
      >
        <span className="mr-[14px] font-bold">{name}</span>
        <Svg id="arrow-next" width={14} height={14} className="rotate-90" />
      </div>

      <div className="collapse-content overflow-visible !p-0 peer-checked:mb-[10px] peer-checked:!pt-[5px]">
        {children}
      </div>
    </div>
  );
}

export default Collapse;
