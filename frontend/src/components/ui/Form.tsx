import React from 'react';
import {
  useForm,
  type SubmitHandler,
  type DefaultValues,
  type FieldValues,
} from 'react-hook-form';

interface EnrichedChildren {
  onChange(): void;
  selectedValue: string;
  name: string;
  children?: React.ReactNode;
}

function Form<T extends FieldValues>({
  defaultValues,
  children,
  onSubmit,
}: {
  defaultValues: DefaultValues<T>;
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
}) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
}

export default Form;
