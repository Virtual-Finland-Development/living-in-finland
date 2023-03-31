import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Text } from 'suomifi-ui-components';
import type { JmfRecommendation, Occupation, UserOccupation } from '@/types';
import { useOccupationsFlat } from '@/lib/hooks/codesets';
import FormInput from '@/components/form/form-input';
import Loading from '@/components/ui/loading';
import JmfRecommendationsSelect from '../jmf-recommendations/jmf-recommendations';

export interface UserOccupationSelection extends UserOccupation {
  label?: string;
}

interface Props {
  userOccupations: UserOccupationSelection[] | null;
  onSave: (selected: UserOccupation[]) => void;
  onCancel: () => void;
}

export default function OccupationsEdit(props: Props) {
  const { userOccupations, onCancel, onSave } = props;

  const [phase, setPhase] = useState<'selections' | 'additional-info'>(
    'selections'
  );
  const [selected, setSelected] = useState<UserOccupationSelection[]>(
    userOccupations || []
  );

  const selectOccupation = useCallback((occupation: JmfRecommendation) => {
    setSelected(prev => {
      let selected = [...prev];
      const index = selected.findIndex(
        s => s.escoIdentifier === occupation.uri
      );

      if (index > -1) {
        selected = selected.filter((_, i) => i !== index);
      } else {
        selected.push({
          label: occupation.label,
          escoIdentifier: occupation.uri,
          escoCode: '',
          workExperience: 0,
          employer: '',
        });
      }

      return selected;
    });
  }, []);

  const handleSave = () => {
    onSave(
      selected.map(s => ({
        escoIdentifier: s.escoIdentifier!,
        escoCode: '',
        workExperience: 0,
        employer: '',
      }))
    );
  };

  if (phase === 'additional-info') {
    return (
      <AdditionalInfo
        selected={selected}
        onBack={() => setPhase('selections')}
        onSave={onSave}
      />
    );
  }

  return (
    <>
      <JmfRecommendationsSelect
        type="occupations"
        isControlled
        controlledSelected={selected.map(s => ({
          uri: s.escoIdentifier,
          label: s.label!,
        }))}
        onSelect={selectOccupation}
        onSave={handleSave}
        onCancel={onCancel}
      />

      <div className="flex flecx-row items-start gap-3 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          disabled={!selected.length}
          iconRight="arrowRight"
          /* onClick={handleSave} */ onClick={() => setPhase('additional-info')}
        >
          Next
        </Button>
      </div>
    </>
  );
}

interface AdditionalInfoProps {
  selected: UserOccupationSelection[];
  onBack: () => void;
  onSave: (selected: UserOccupation[]) => void;
}

interface FormProps {
  occupations: UserOccupationSelection[];
}

function AdditionalInfo(props: AdditionalInfoProps) {
  const { selected, onBack, onSave } = props;

  const { data: occupations, isLoading } = useOccupationsFlat();

  const { handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      occupations: selected,
    },
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    console.log(values);

    for (let i of values.occupations) {
      const o = occupations
        ? occupations.find(o => i.escoIdentifier === o.uri)
        : undefined;
      console.log(o);
    }
    /**
     * OCCUPATIONS MISSING URI, will be added
     */
    /* onSave(
      values.occupations.map(selectedOccupation => ({
        escoIdentifier: selectedOccupation.escoIdentifier!,
        workExperience: selectedOccupation.workExperience!,
        employer: selectedOccupation.employer!,
        escoCode:
          occupations?.find(o => o.uri === selectedOccupation.escoIdentifier)
            ?.escoCode || '',
      }))
    ); */
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selected.length > 0 && (
        <div className="flex flex-col gap-2">
          {selected.map((s, i) => (
            <div
              key={s.escoIdentifier}
              className="border border-gray-300 p-2 bg-suomifi-blue-bg-light"
            >
              <Text className="!italic">{s.label}</Text>
              <div className="grid grid-cols-2 ">
                <FormInput
                  name={`occupations.${i}.employer`}
                  control={control}
                  rules={{ required: 'Employer is required. ' }}
                  labelText="Employer"
                />
                <FormInput
                  name={`occupations.${i}.workExperience`}
                  control={control}
                  rules={{
                    required: 'Work experience is required.',
                    valueAsNumber: true,
                  }}
                  labelText="Work experience"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flecx-row items-start gap-3 mt-4">
        <Button variant="secondary" icon="arrowLeft" onClick={onBack}>
          Back
        </Button>
        <Button
          disabled={!selected.length}
          type="submit" /* onClick={handleSave} */
        >
          Save
        </Button>
      </div>
    </form>
  );
}
