import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import { useCompanyForm } from '@/context/company-form-context';
import FormInput from '@/components/form/form-input';
import FormPhoneInput from '@/components/form/form-phone-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FormProps {
  registrant: {
    givenName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

export default function CompanyFormStep1() {
  const { values, setValues, setStep } = useCompanyForm();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: values?.registrant && { registrant: values.registrant },
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues(values, 'registrant');
    setStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <CustomHeading variant="h3">Registrant</CustomHeading>
        <FormInput
          name={`registrant.givenName`}
          labelText="Given name"
          control={control}
          rules={{ required: 'Given name is required.' }}
        />
        <FormInput
          name={`registrant.lastName`}
          labelText="Last name"
          control={control}
          rules={{ required: 'Last name is required.' }}
        />
        <FormInput
          type="email"
          name={`registrant.email`}
          labelText="Email"
          control={control}
          rules={{ required: 'Email is required.' }}
        />
        <FormPhoneInput
          name={`registrant.phoneNumber`}
          control={control}
          rules={{ required: 'Phone nuber is required.' }}
          labelText="Phone number"
          hintText="Use international format (+358xxx)"
          error={errors?.registrant?.phoneNumber}
        />
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
