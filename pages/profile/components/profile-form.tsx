import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import { ProfileBasicInformation } from '@/types';
import api from '@/lib/api';
import { useCountries } from '@/lib/hooks/codesets';
import { pickRandomName } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/context/toast-context';
import FormInput from '@/components/form/form-input';
import FormPhoneInput from '@/components/form/form-phone-input';
import FormSingleSelect from '@/components/form/form-single-select';
import Loading from '@/components/ui/loading';

interface Props {
  profile: ProfileBasicInformation | undefined;
}

export default function ProfileForm(props: Props) {
  const { profile } = props;
  const { userEmail } = useAuth();
  const { data: countries, isLoading } = useCountries();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileBasicInformation>({
    defaultValues: profile
      ? { ...profile }
      : {
          givenName: pickRandomName('firstName'),
          lastName: pickRandomName('lastName'),
          email: userEmail!,
          phoneNumber: '+1 231 231 2312',
          residency: '',
        },
  });

  const onSubmit: SubmitHandler<ProfileBasicInformation> = async values => {
    try {
      const response = await api.profile.saveProfile(values);
      console.log(response);
      toast({
        status: 'neutral',
        title: 'Success',
        content: 'Profile information saved successfully!',
      });
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Error',
        content: error?.message || 'Something went wrong.',
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <FormInput
          name={`givenName`}
          labelText="Given name"
          control={control}
          rules={{ required: 'Given name is required.' }}
          readOnly
        />
        <FormInput
          name={`lastName`}
          labelText="Last name"
          control={control}
          rules={{ required: 'Last name is required.' }}
          readOnly
        />
        <FormInput
          type="email"
          name={`email`}
          labelText="Email"
          control={control}
          rules={{ required: 'Email is required.' }}
          readOnly
        />
        <FormPhoneInput
          name={`phoneNumber`}
          control={control}
          rules={{ required: 'Phone number is required.' }}
          labelText="Phone number"
          hintText="Use international format (+358xxx)"
          readOnly
        />
        <FormSingleSelect
          name={`residency`}
          control={control}
          rules={{ required: 'Residency is required.' }}
          labelText="Country of residence"
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
      <div className="mt-8">
        <Button type="submit" disabled={isSubmitting}>
          Save profile
        </Button>
      </div>
    </form>
  );
}
