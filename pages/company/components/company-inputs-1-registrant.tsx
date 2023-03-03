import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import type { Registrant } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormPhoneInput from '@/components/form/form-phone-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  company: {
    registrant: Registrant;
  };
}

const REQUIRED_FIELDS = ['givenName', 'lastName', 'email', 'phoneNumber'];

export default function CompanyRegistrant() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid } = getFieldState('company.registrant', formState);

  const isStepDone = useMemo(() => {
    const hasContextValues = REQUIRED_FIELDS.every(field =>
      lodash_get(company?.registrant, field)
    );
    return hasContextValues ? !invalid : formState.isValid;
  }, [company?.registrant, formState.isValid, invalid]);

  useEffect(() => {
    setIsCurrentStepDone('company.registrant', isStepDone);
  }, [isStepDone, setIsCurrentStepDone]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <CustomHeading variant="h3">Registrant</CustomHeading>
      <FormInput
        name={`company.registrant.givenName`}
        labelText="Given name"
        control={control}
        rules={{ required: 'Given name is required.' }}
      />
      <FormInput
        name={`company.registrant.lastName`}
        labelText="Last name"
        control={control}
        rules={{ required: 'Last name is required.' }}
      />
      <FormInput
        type="email"
        name={`company.registrant.email`}
        labelText="Email"
        control={control}
        rules={{ required: 'Email is required.' }}
      />
      <FormPhoneInput
        name={`company.registrant.phoneNumber`}
        control={control}
        rules={{ required: 'Phone nuber is required.' }}
        labelText="Phone number"
        hintText="Use international format (+358xxx)"
        error={formState.errors?.company?.registrant?.phoneNumber}
      />
    </div>
  );
}
