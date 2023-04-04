import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Button, Text } from 'suomifi-ui-components';
import type { Certification } from '@/types';
import FormInput from '@/components/form/form-input';
import MoreRecommendations from '../jmf-recommendations/more-recommendations';

interface Props {
  userCertifications: Certification[];
  onSave: (selected: Certification[]) => void;
  onCancel: () => void;
}

interface FormProps {
  certifications: Certification[];
}

const DEFAULT_VALUE: Certification = {
  escoIdentifier: [],
  certificationName: '',
  institutionName: '',
};

export default function CertificationsEdit(props: Props) {
  const { userCertifications, onSave, onCancel } = props;

  const { handleSubmit, control, watch } = useForm<FormProps>({
    defaultValues: { certifications: userCertifications },
  });

  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: 'certifications',
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    onSave(values.certifications);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        {!fields.length && <Text>No certifications added.</Text>}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-2 gap-3 items-end border-b border-gray-300 pb-4"
          >
            <FormInput
              name={`certifications.${index}.certificationName`}
              control={control}
              rules={{ required: true }}
              labelText="Certification name"
            />
            <FormInput
              name={`certifications.${index}.institutionName`}
              control={control}
              rules={{ required: true }}
              labelText="Institution name"
            />
            <Controller
              name={`certifications.${index}.escoIdentifier`}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <MoreRecommendations
                  onSelect={(
                    selected: {
                      labelText: string;
                      uniqueItemId: string;
                    }[]
                  ) => onChange(selected.map(s => s.uniqueItemId))}
                  defaultValue={value}
                />
              )}
            />

            <div>
              <Button
                variant="link"
                iconRight="remove"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          variant="secondaryNoBorder"
          iconRight="plus"
          onClick={() => append(DEFAULT_VALUE)}
        >
          Add new
        </Button>
      </div>

      <div className="flex flex-row gap-3 mt-8">
        <Button variant="secondary" onClick={onCancel}>
          Close
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
