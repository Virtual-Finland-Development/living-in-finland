import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import { Button } from 'suomifi-ui-components';
import type { ShareSeries } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  company: {
    shareSeries: ShareSeries[];
  };
}

const REQUIRED_FIELDS = ['shareSeriesClass', 'numberOfShares', 'shareValue'];

const SHARE_SERIES_CLASS_OPTIONS = [
  {
    labelText: 'A',
    uniqueItemId: 'A',
  },
  {
    labelText: 'B',
    uniqueItemId: 'B',
  },
  {
    labelText: 'C',
    uniqueItemId: 'C',
  },
  {
    labelText: 'D',
    uniqueItemId: 'D',
  },
  {
    labelText: 'E',
    uniqueItemId: 'E',
  },
];

export default function CompanyShareSeries() {
  const {
    values: { company },
    setIsCurrentStepDone,
    codesets: { currencies },
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid } = getFieldState('company.shareSeries', formState);
  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: 'company.shareSeries',
  });

  const appendShareSeries = () => {
    append({
      shareSeriesClass: 'A',
      numberOfShares: 0,
      shareValue: 0,
      shareValueCurrency: 'EUR',
    });
  };

  const removeShareSeries = (index: number) => {
    remove(index);
  };

  const isStepDone = useMemo(() => {
    const hasContextValues = (() => {
      const shareSeriesArr = lodash_get(company, 'shareSeries');

      if (Array.isArray(shareSeriesArr)) {
        return shareSeriesArr.every(i => {
          REQUIRED_FIELDS.every(field => i[field as keyof ShareSeries]);
        });
      }

      return false;
    })();

    return hasContextValues ? !invalid : formState.isValid;
  }, [company, formState.isValid, invalid]);

  useEffect(() => {
    setIsCurrentStepDone('company.shareSeries', isStepDone);
  }, [isStepDone, setIsCurrentStepDone]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <CustomHeading variant="h4">Stage 1.4</CustomHeading>
        <CustomHeading variant="h2">Share series</CustomHeading>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col items-start gap-3 border-b border-b-gray-300 pb-6 w-full"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <FormSingleSelect
              name={`company.shareSeries.${index}.shareSeriesClass`}
              control={control}
              rules={{ required: 'Share value is required.' }}
              items={SHARE_SERIES_CLASS_OPTIONS}
              labelText="Share series class"
            />
            <FormInput
              type="number"
              name={`company.shareSeries.${index}.numberOfShares`}
              control={control}
              rules={{
                required: 'Number of shares is required.',
                validate: value => value > -1,
              }}
              labelText="Number of shares"
            />
            <FormInput
              type="number"
              name={`company.shareSeries.${index}.shareValue`}
              control={control}
              rules={{
                required: 'Share value is required.',
                validate: value => value > -1,
              }}
              labelText="Share value"
            />
            <FormSingleSelect
              name={`company.shareSeries.${index}.shareValueCurrency`}
              control={control}
              labelText="Share value currency"
              optionalText="optional"
              items={
                currencies
                  ? currencies.map(c => ({
                      labelText: `${c.code} (${c.name})`,
                      uniqueItemId: c.id,
                    }))
                  : []
              }
            />
          </div>
          {index > 0 && (
            <Button
              variant="link"
              iconRight="remove"
              onClick={() => removeShareSeries(index)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button
        variant="secondaryNoBorder"
        iconRight="plus"
        onClick={appendShareSeries}
      >
        Add new
      </Button>
    </div>
  );
}
