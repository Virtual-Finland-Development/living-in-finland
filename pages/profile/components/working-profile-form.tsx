import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import { Label, Text } from 'suomifi-ui-components';
import { EmploymentType, JobApplicationProfile, WorkingTime } from '@/types';
import api from '@/lib/api';
import { EMPLOYMENT_TYPE_LABELS, WORKING_TIME_LABELS } from '@/lib/constants';
import {
  useEducationLevels,
  useLanguages,
  useMunicipalities,
  useNaceCodes,
  useRegions,
  useWorkPermits,
} from '@/lib/hooks/codesets';
import {
  findNace,
  getGroupedNaceCodes,
  nullifyUndefinedValues,
} from '@/lib/utils';
import { useModal } from '@/context/modal-context';
import { useToast } from '@/context/toast-context';
import FormMultiSelect from '@/components/form/form-multi-select';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';
import Loading from '@/components/ui/loading';
import NaceSelect from './nace-select/nace-select';

interface Props {
  jobApplicationProfile: JobApplicationProfile | undefined;
}

export default function WorkingProfileForm(props: Props) {
  const { jobApplicationProfile } = props;

  const { openModal, closeModal } = useModal();
  const toast = useToast();

  const { data: languages, isLoading: languagesLoading } = useLanguages();
  const { data: naceCodes, isLoading: naceCodesLoading } = useNaceCodes();
  const { data: permits, isLoading: permitsLoading } = useWorkPermits();
  const { data: regions, isLoading: regionsLoading } = useRegions();
  const { data: municipalities, isLoading: municipalitiesLoading } =
    useMunicipalities();
  const { data: educationLevels, isLoading: educationLevelsLoading } =
    useEducationLevels();

  const isLoading =
    languagesLoading ||
    naceCodesLoading ||
    permitsLoading ||
    educationLevelsLoading ||
    regionsLoading ||
    municipalitiesLoading;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm<JobApplicationProfile>({
    defaultValues: jobApplicationProfile && { ...jobApplicationProfile },
  });

  const { workPreferences } = watch();
  // console.log(workPreferences);

  const groupedNaceCodes = useMemo(
    () => getGroupedNaceCodes(naceCodes || []),
    [naceCodes]
  );

  const permitOptions = useMemo(() => {
    if (!permits) return [];
    return permits.map(p => ({
      labelText: p.prefLabel.en,
      uniqueItemId: p.codeValue,
    }));
  }, [permits]);

  const languageOptions = useMemo(() => {
    if (!languages) return [];
    return languages.map(c => ({
      labelText: c.englishName,
      uniqueItemId: c.twoLetterISOLanguageName,
    }));
  }, [languages]);

  const regionOptions = useMemo(() => {
    if (!regions) return [];
    return regions.map(r => ({
      labelText: r.label.en,
      uniqueItemId: r.code,
    }));
  }, [regions]);

  const municipalityOptions = useMemo(() => {
    if (!municipalities) return [];
    return municipalities.map(m => ({
      labelText: m.Selitteet.find(s => s.Kielikoodi === 'en')?.Teksti || '',
      uniqueItemId: m.Koodi,
    }));
  }, [municipalities]);

  const onSubmit: SubmitHandler<JobApplicationProfile> = async values => {
    try {
      const payload = nullifyUndefinedValues(values);
      // const response = await api.profile.saveJobApplicationProfile(values);
      console.log(payload);
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

  const openNaceSelect = () =>
    openModal({
      title: 'Select your preferred industry',
      content: (
        <NaceSelect
          items={groupedNaceCodes}
          defaultSelected={
            workPreferences?.naceCode
              ? findNace(groupedNaceCodes, workPreferences.naceCode)
              : undefined
          }
          onSelect={selected => {
            setValue(
              'workPreferences.naceCode',
              selected?.dotNotationCodeValue || null,
              { shouldDirty: true }
            );
            closeModal();
          }}
          onCancel={closeModal}
        />
      ),
      onClose: () => {},
    });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <CustomHeading variant="h2" suomiFiBlue="dark">
        Some header
      </CustomHeading>
      <div className="flex flex-col gap-4 items-start">
        <FormMultiSelect
          name={'permits'}
          control={control}
          labelText="Your acquired permits"
          items={permitOptions}
        />
      </div>
      <CustomHeading variant="h2" suomiFiBlue="dark">
        Work preferences
      </CustomHeading>
      <div className="flex flex-col gap-4 items-start">
        <FormSingleSelect
          name={`workPreferences.typeOfEmployment`}
          control={control}
          labelText="Preferred type of employment"
          items={Object.keys(EmploymentType)
            .filter((key: any) => !isNaN(Number(EmploymentType[key])))
            .map(type => ({
              labelText:
                EMPLOYMENT_TYPE_LABELS[
                  type as keyof typeof EMPLOYMENT_TYPE_LABELS
                ],
              uniqueItemId: type,
            }))}
        />
        <FormSingleSelect
          name={`workPreferences.workingTime`}
          control={control}
          labelText="Preferred working time"
          items={Object.keys(WorkingTime)
            .filter(key => key.length === 2)
            .map(type => ({
              labelText:
                WORKING_TIME_LABELS[type as keyof typeof WORKING_TIME_LABELS],
              uniqueItemId: type,
            }))}
        />
        <FormMultiSelect
          name={'workPreferences.workingLanguage'}
          control={control}
          labelText="Working languages"
          items={languageOptions}
        />
        <FormMultiSelect
          name={`workPreferences.preferredRegion`}
          control={control}
          labelText="Preferred regions to work in"
          items={regionOptions}
        />
        <FormMultiSelect
          name={`workPreferences.preferredMunicipality`}
          control={control}
          labelText="Preferred municipalities to work in"
          items={municipalityOptions}
        />
        <div>
          <Label>Preferred industry</Label>
          <Text className="!text-base">
            {!workPreferences?.naceCode && <span>No industry selected, </span>}
            <span
              role="button"
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              onClick={openNaceSelect}
            >
              {!workPreferences?.naceCode
                ? 'click here to add.'
                : findNace(naceCodes || [], workPreferences.naceCode)?.prefLabel
                    .en}
            </span>
          </Text>
        </div>
      </div>
      <div className="mt-8">
        <Button type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
}
