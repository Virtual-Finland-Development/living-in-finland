import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import { Button } from 'suomifi-ui-components';
import type { SigningRight } from '@/types';
import { SIGNING_RIGHTS_ROLE_OPTIONS } from '@/lib/constants';
import { pickRandomDateString, pickRandomName } from '@/lib/utils';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  signatoryRights: {
    signingRights: Partial<SigningRight>[];
  };
}

const DEFAULT_RIGHT = {
  role: 'director' as const,
  givenName: pickRandomName('firstName'),
  middleNames: pickRandomName('firstName'),
  lastName: pickRandomName('lastName'),
  dateOfBirth: pickRandomDateString(),
  nationality: 'FIN',
};

const REQUIRED_FIELDS = [
  'givenName',
  'middleNames',
  'lastName',
  'dateOfBirth',
  'nationality',
];

export default function SignatoryRightsSigningRights() {
  const {
    values: { signatoryRights },
    setIsCurrentStepDone,
    codesets: { countries },
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid } = getFieldState('signatoryRights.signingRights', formState);
  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: 'signatoryRights.signingRights',
  });

  const appendShareSeries = () => {
    append(DEFAULT_RIGHT);
  };

  const removeShareSeries = (index: number) => {
    remove(index);
  };

  const isStepDone = useMemo(() => {
    const hasContextValues = (() => {
      const signatoryRightsArr = lodash_get(signatoryRights, 'signinRights');

      if (Array.isArray(signatoryRightsArr)) {
        return signatoryRightsArr.every(i => {
          REQUIRED_FIELDS.every(field => i[field as keyof SigningRight]);
        });
      }

      return false;
    })();

    return hasContextValues ? !invalid : formState.isValid;
  }, [signatoryRights, formState.isValid, invalid]);

  useEffect(() => {
    setIsCurrentStepDone('signatoryRights.signingRights', isStepDone);
  }, [isStepDone, setIsCurrentStepDone]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <CustomHeading variant="h4">Stage 1/2</CustomHeading>
        <CustomHeading variant="h2">Signing rights</CustomHeading>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col items-start gap-3 border-b border-b-gray-300 pb-6 w-full"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <FormSingleSelect
              name={`signatoryRights.signingRights.${index}.role`}
              control={control}
              rules={{ required: 'Role is required.' }}
              labelText="Role"
              items={SIGNING_RIGHTS_ROLE_OPTIONS}
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.personalID`}
              control={control}
              optionalText="optional"
              labelText="Personal ID"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.givenName`}
              control={control}
              rules={{ required: 'Given name is required.' }}
              labelText="Given name"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.middleNames`}
              control={control}
              rules={{ required: 'Middle names are required.' }}
              labelText="Middle names"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.lastName`}
              control={control}
              rules={{ required: 'Last name is required.' }}
              labelText="Last name"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <FormInput
              type="date"
              name={`signatoryRights.signingRights.${index}.dateOfBirth`}
              control={control}
              rules={{ required: 'Given name is required.' }}
              labelText="Date of birth"
              hintText="Select from date picker"
            />
            <FormSingleSelect
              name={`signatoryRights.signingRights.${index}.nationality`}
              control={control}
              rules={{ required: 'Nationality is required.' }}
              labelText="Nationality"
              hintText="Filter by typing or select from dropdown"
              items={
                countries
                  ? countries.map(c => ({
                      labelText: c.englishName,
                      uniqueItemId: c.threeLetterISORegionName,
                    }))
                  : []
              }
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <FormInput
              name={`signatoryRights.signingRights.${index}.fullAddress`}
              control={control}
              labelText="Full address"
              optionalText="optional"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.thoroughfare`}
              control={control}
              optionalText="optional"
              labelText="Thoroughfare"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.locatorDesignator`}
              control={control}
              rules={{
                validate: value => {
                  if (!value) return true;
                  if (value.length > 10) return 'Max 10 characters.';
                },
              }}
              optionalText="optional"
              labelText="Locator designator"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.locatorName`}
              control={control}
              optionalText="optional"
              labelText="Locator name"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.addressArea`}
              control={control}
              optionalText="optional"
              labelText="Address area"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.postCode`}
              control={control}
              optionalText="optional"
              labelText="Post code"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.postName`}
              control={control}
              optionalText="optional"
              labelText="Post name"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.poBox`}
              control={control}
              optionalText="optional"
              labelText="Post box"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.adminUnitLevel_1`}
              control={control}
              optionalText="optional"
              labelText="Admin unit level 1"
            />
            <FormInput
              name={`signatoryRights.signingRights.${index}.adminUnitLevel_2`}
              control={control}
              optionalText="optional"
              labelText="Admin unit level 2"
            />
          </div>
          <Button
            variant="link"
            iconRight="remove"
            onClick={() => removeShareSeries(index)}
          >
            Remove
          </Button>
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
