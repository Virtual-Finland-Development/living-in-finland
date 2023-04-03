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
  formatDefaultValue?: (value: any) => any;
  min?: number;
  step?: number;
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
    formatDefaultValue,
    min = 1,
    step = 1,
  } = props;
  console.log(min);
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
              defaultValue={
                typeof formatDefaultValue === 'function' && value
                  ? formatDefaultValue(value)
                  : value
              }
              onChange={onChange}
              onBlur={onBlur}
              min={min}
              step={step}
              readOnly={readOnly}
            />
          )}
        </>
      )}
    />
  );
}
