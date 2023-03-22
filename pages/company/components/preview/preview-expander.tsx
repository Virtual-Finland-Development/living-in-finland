import { MdDone, MdOutlineInfo } from 'react-icons/md';
import {
  Button,
  Expander,
  ExpanderContent,
  ExpanderTitleButton,
} from 'suomifi-ui-components';
import { COMPANY_DATA_LABELS } from '@/lib/constants';
import CustomHeading from '@/components/ui/custom-heading';
import MultiValue from './multi-value';
import SingleValue from './single-value';

interface PreviewExpanderProps<T> {
  title: string;
  showEditButtons?: boolean;
  onEditClick?: () => void;
  onClearClick?: () => void;
  allStepsDone?: boolean;
  values: Partial<Record<keyof T, any>> | undefined;
}

export default function PreviewExpander<T>(props: PreviewExpanderProps<T>) {
  const {
    title,
    showEditButtons = false,
    onEditClick = () => {},
    onClearClick = () => {},
    allStepsDone,
    values,
  } = props;

  return (
    <Expander>
      <ExpanderTitleButton>
        <div className="flex flex-row gap-2 items-center">
          <span>{title}</span>{' '}
          {typeof allStepsDone === 'boolean' && (
            <>
              {allStepsDone ? (
                <MdDone size={22} color="green" />
              ) : (
                <MdOutlineInfo size={22} color="orange" />
              )}
            </>
          )}
        </div>
      </ExpanderTitleButton>
      <ExpanderContent className="!text-base">
        <div className="flex flex-col gap-4 mt-4">
          {allStepsDone !== undefined && !allStepsDone && (
            <CustomHeading variant="h4">Missing information.</CustomHeading>
          )}

          {values !== undefined &&
            Object.keys(values).map(dataKey => {
              const value: any = values[dataKey as keyof typeof values];
              const isArray = Array.isArray(value);
              const isString =
                typeof value === 'string' || value instanceof String;

              return (
                <div key={dataKey}>
                  <CustomHeading variant="h4">
                    {COMPANY_DATA_LABELS[dataKey] || ''}
                  </CustomHeading>

                  <div className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4">
                    {isArray &&
                      value.map((_, index: number) => (
                        <MultiValue
                          key={`${dataKey}-${index}`}
                          index={index}
                          valueObj={value[index]}
                        />
                      ))}
                    {!isArray && !isString && (
                      <div>
                        {value &&
                          Object.keys(value).map((key, i) => {
                            const nestedValue =
                              value[key as keyof typeof value];
                            const isArray = Array.isArray(nestedValue);

                            return !isArray ? (
                              <SingleValue
                                key={i}
                                label={COMPANY_DATA_LABELS[key] || ''}
                                value={nestedValue as string}
                              />
                            ) : (
                              <MultiValue
                                key={i}
                                index={i}
                                valueObj={nestedValue}
                              />
                            );
                          })}
                      </div>
                    )}
                    {isString && (
                      <SingleValue
                        label={COMPANY_DATA_LABELS[dataKey] || ''}
                        value={value as string}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {showEditButtons && (
          <div className="flex flex-row gap-4 mt-8">
            <Button onClick={onEditClick}>Edit information</Button>
            <Button variant="secondary" onClick={onClearClick}>
              Clear data
            </Button>
          </div>
        )}
      </ExpanderContent>
    </Expander>
  );
}
