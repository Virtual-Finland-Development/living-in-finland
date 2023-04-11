import { Label, Text } from 'suomifi-ui-components';
import type { Education, EducationField, EducationLevel } from '@/types';
import { useModal } from '@/context/modal-context';
import EducationsEdit from './educations-edit';

interface Props {
  userEducations: Education[] | undefined;
  educationFields: EducationField[];
  educationLevels: EducationLevel[];
  onSelect: (selected: Education[]) => void;
}

export default function EducationsSelect(props: Props) {
  const { userEducations, onSelect, educationFields, educationLevels } = props;

  const { openModal, closeModal } = useModal();

  const openEducationEdit = () =>
    openModal({
      title: 'Educations',
      content: (
        <EducationsEdit
          userEducations={userEducations}
          educationFields={educationFields}
          educationLevels={educationLevels}
          onSave={selected => {
            onSelect(selected);
            closeModal();
          }}
          onCancel={closeModal}
        />
      ),
      onClose: () => {},
    });

  return (
    <div>
      <Label>Educations</Label>
      {!userEducations?.length ? (
        <Text className="!text-base">
          <span>No educations selected, </span>
          <span
            role="button"
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            onClick={openEducationEdit}
          >
            click here to add.
          </span>
        </Text>
      ) : (
        <div className="flex flex-col flex-wrap gap-2">
          {userEducations.map((e, index) => (
            <Text key={`${e.educationField}-${index}`} className="!text-base">
              <span
                role="button"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                onClick={openEducationEdit}
              >
                {e.educationName}
              </span>
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}
