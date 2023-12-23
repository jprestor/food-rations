import { get } from 'lodash';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

const customStyles = {
  control: (provided: {}) => ({
    ...provided,
    borderColor: '#D4EBFD',
    borderRadius: '5px',
  }),
  valueContainer: (provided: {}) => ({
    ...provided,
    padding: '0.5px 11px',
  }),
};

export default function SelectInput({
  name,
  label,
  options,
  control,
  errors,
  callback,
  className,
  ...restProps
}: {
  name: string;
  label?: string;
  options: [];
  control: any;
  errors: {};
  callback?: (option: {}) => void;
  className?: string;
  children?: React.ReactNode;
}) {
  const error = get(errors, name);

  return (
    <label className={`relative block ${className}`}>
      {label && <p className="mb-[12px] text-sm">{label}</p>}

      <Controller
        name={name}
        control={control}
        render={({ field }: any) => (
          <Select
            styles={customStyles}
            options={options}
            isSearchable
            noOptionsMessage={(inputValue) => 'Не найдено'}
            onChange={(selectedOption: any) => {
              field.onChange(selectedOption.value);

              if (callback) {
                callback(selectedOption);
              }
            }}
            {...restProps}
          />
        )}
      />

      {error && (
        <div className="text-alert pt-[5px] text-sm">{error.message}</div>
      )}
    </label>
  );
}
