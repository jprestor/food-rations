import { useState, useRef } from 'react';
import { useController } from 'react-hook-form';

import Button from './Button';
import Svg from './Svg';
import { cn } from '@/lib';

interface IProps {
  name: string;
  label?: string;
  control: any;
  error?: string;
  placeholder?: string;
  className?: string;
}

function FileInput({
  name,
  label,
  control,
  error,
  placeholder,
  className,
  ...restProps
}: IProps) {
  const [fileName, setFileName] = useState('');
  const { field } = useController({ control, name });
  const labelRef = useRef<HTMLLabelElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    setFileName(file.name);
    field.onChange(file);
  };

  return (
    <label className={cn('relative block', className)} ref={labelRef}>
      {label && <p className="field-label">{label}</p>}

      <input
        className="hidden"
        type="file"
        onChange={onChange}
        {...restProps}
      />

      <div className="flex items-center gap-4">
        <span className="text-Secondary/Grey3 font-semibold">{fileName}</span>
        <Button className="gap-2" onClick={() => labelRef.current?.click()}>
          <Svg className="mt-0.5" id="plus" width={14} height={14} />
          {fileName ? 'Изменить реквизиты оплаты ' : 'Реквизиты оплаты'}
        </Button>
      </div>

      {error && <div className="field-error">{error}</div>}
    </label>
  );
}

export default FileInput;
