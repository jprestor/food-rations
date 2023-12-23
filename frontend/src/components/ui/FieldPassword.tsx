import React, { useState, forwardRef } from 'react';
import Svg from './Svg';
import { cn } from '@/lib';

interface IFieldPassword {
  name?: string;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  autoComplete?: 'on' | 'off' | 'new-password';
  disabled?: boolean;
  children?: React.ReactNode;
}

type RefType = HTMLInputElement;

const FieldPassword = forwardRef<RefType, IFieldPassword>(
  (
    {
      name,
      label,
      placeholder = label,
      value,
      onChange,
      onBlur,
      className,
      error,
      autoComplete,
      disabled,
      children,
    },
    ref,
  ) => {
    const [passwordInputType, setPasswordInputType] = useState<
      'text' | 'password'
    >('password');

    const togglePasswordVisibility = () => {
      setPasswordInputType((prev) =>
        prev === 'password' ? 'text' : 'password',
      );
    };

    return (
      <label className={cn('field-wrapper', className)}>
        <input
          className="field-input"
          name={name}
          type={passwordInputType}
          value={value}
          placeholder={placeholder as string}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          ref={ref}
        />
        {label && <p className="field-label">{label}</p>}
        {children}
        {error && <div className="field-error">{error}</div>}

        <a
          className={cn(
            'absolute right-2 top-3',
            passwordInputType === 'text'
              ? 'text-Primary/Blue'
              : 'text-[#7F7E94]',
          )}
          onClick={togglePasswordVisibility}
        >
          <Svg id="hide" width="24" height="24" />
        </a>
      </label>
    );
  },
);

FieldPassword.displayName = 'FieldPassword';

export default FieldPassword;
