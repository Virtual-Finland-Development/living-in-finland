import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { format } from 'date-fns';
import { DateInput, TextInput } from 'suomifi-ui-components';

interface FormInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  rules?: RegisterOptions;
  control: Control<T>;
}

interface Props<T extends FieldValues> extends FormInputControllerProps<T> {
  labelText: string;
  hintText?: string;
  optionalText?: string;
  placeholder?: string;
  showStatusText?: boolean;
  readOnly?: boolean;
  type?:
    | 'number'
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'date'
    | undefined;
}

export default function FormInput<T extends FieldValues>(props: Props<T>) {
  const {
    name,
    rules,
    control,
    type,
    labelText,
    hintText,
    optionalText,
    showStatusText = true,
    readOnly = false,
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          {type === 'date' ? (
            <DateInput
              labelText={labelText}
              hintText={hintText}
              optionalText={optionalText}
              datePickerEnabled
              className="!w-suomifi-input-default"
              status={error && 'error'}
              statusText={showStatusText && error ? error.message : ''}
              value={value ? format(new Date(value), 'dd.MM.yyyy') : ''}
              onChange={({ date }) => {
                if (date instanceof Date && !isNaN(date.getTime())) {
                  onChange(format(date, 'yyyy-MM-dd'));
                }
              }}
            />
          ) : (
            <TextInput
              type={type}
              labelText={labelText}
              hintText={hintText}
              optionalText={optionalText}
              status={error && 'error'}
              statusText={showStatusText && error ? error.message : ''}
              defaultValue={value}
              onChange={onChange}
              onBlur={onBlur}
              min="1"
              readOnly={readOnly}
            />
          )}
        </>
      )}
    />
  );
}
