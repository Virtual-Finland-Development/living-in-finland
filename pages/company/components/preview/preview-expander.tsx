import { MdDone, MdOutlineInfo } from 'react-icons/md';
import {
  Button,
  Expander,
  ExpanderContent,
  ExpanderTitleButton,
} from 'suomifi-ui-components';
import { COMPANY_DATA_LABELS } from '@/lib/constants';
import { useCompanyContext } from '@/context/company-context';
import CustomHeading from '@/components/ui/custom-heading';
import MultiValue from './multi-value';
import SingleValue from './single-value';

interface PreviewExpanderProps {
  type: 'company' | 'beneficialOwners' | 'signatoryRights';
  title: string;
  showEditButtons?: boolean;
  onEditClick?: () => void;
  onClearClick?: () => void;
}

export default function PreviewExpander(props: PreviewExpanderProps) {
  const {
    type,
    title,
    showEditButtons = false,
    onEditClick = () => {},
    onClearClick = () => {},
  } = props;
  const { values, doneSteps } = useCompanyContext();

  const trackedValues = values[type];

  const trackedDoneSteps = Object.keys(doneSteps)
    .filter(key => key.includes(type))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: doneSteps[key] });
    }, {});
  const doneStepValues = Object.values(trackedDoneSteps);
  const allStepsDone = doneStepValues.every(isDone => isDone);

  return (
    <Expander>
      <ExpanderTitleButton>
        <div className="flex flex-row gap-2 items-center">
          <span>{title}</span>{' '}
          {allStepsDone ? (
            <MdDone size={22} color="green" />
          ) : (
            <MdOutlineInfo size={22} color="orange" />
          )}
        </div>
      </ExpanderTitleButton>
      <ExpanderContent className="!text-base">
        <div className="flex flex-col gap-4 mt-4">
          {!allStepsDone && (
            <CustomHeading variant="h3">Missing information.</CustomHeading>
          )}

          {trackedValues !== undefined &&
            Object.keys(trackedValues).map(dataKey => {
              const value: Record<string, any> =
                trackedValues[dataKey as keyof typeof trackedValues];
              const isArray = Array.isArray(value);

              return (
                <div key={dataKey}>
                  <CustomHeading variant="h4">
                    {COMPANY_DATA_LABELS[dataKey] || ''}
                  </CustomHeading>

                  <div className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4">
                    {isArray ? (
                      value.map((_, index: number) => (
                        <MultiValue
                          key={`${dataKey}-${index}`}
                          index={index}
                          valueObj={value[index]}
                        />
                      ))
                    ) : (
                      <div>
                        {value &&
                          Object.keys(value!).map((key, i) => {
                            const nestedValue = value![key];
                            const isArray = Array.isArray(nestedValue);

                            return !isArray ? (
                              <SingleValue
                                key={i}
                                label={COMPANY_DATA_LABELS[key] || ''}
                                value={nestedValue}
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
