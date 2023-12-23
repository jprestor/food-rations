import React, { CSSProperties, forwardRef } from 'react';
import Svg from './Svg';
import { cn } from '@/lib';

interface ITextInput {
  name?: string;
  label?: React.ReactNode;
  placeholder?: string;
  textarea?: boolean;
  className?: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onReset?: any;
  error?: string;
  disabled?: boolean;
  type?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

type RefType = HTMLInputElement;

const TextInput = forwardRef<RefType, ITextInput>(
  (
    {
      name,
      label,
      placeholder = label,
      textarea,
      value,
      onChange,
      onBlur,
      onReset,
      className,
      error,
      type,
      disabled,
      children,
    },
    ref,
  ) => {
    return (
      <label className={cn('field-wrapper', className)}>
        {textarea ? (
          <textarea
            className="field-input pt-6.5 h-24"
            name={name}
            value={value}
            placeholder={placeholder as string}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            ref={ref as any}
          />
        ) : (
          <input
            className="field-input"
            name={name}
            type={type}
            value={value}
            placeholder={placeholder as string}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            ref={ref}
          />
        )}

        {label && <p className="field-label">{label}</p>}
        {children}
        {error && <div className="field-error">{error}</div>}

        {onReset && (
          <a
            className="text-Secondary/Grey3 hover:text-Primary/Pink absolute right-2 top-1/2 -translate-y-1/2 rotate-45"
            onClick={() => onReset(name)}
          >
            <Svg id="plus" width={16} height={16} />
          </a>
        )}
      </label>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
