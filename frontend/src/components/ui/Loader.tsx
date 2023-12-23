interface ILoader {
  spinnerStyle?: string;
  className?: string;
}

function Loader({ spinnerStyle, className }: ILoader) {
  return (
    <div
      className={`flex w-fit animate-spin items-center justify-center ${className}`}
    >
      <div
        className={`border-t-error h-[30px] w-[30px] rounded-full border-[3px] border-white ${spinnerStyle}`}
      />
    </div>
  );
}

export default Loader;
