import { useMemo } from 'react';
import { Label, Text } from 'suomifi-ui-components';
import type { Occupation, OtherSkill } from '@/types';
import { useModal } from '@/context/modal-context';
import OtherSkillsEdit from './other-skills-edit';

interface Props {
  userOtherSkills: OtherSkill[] | undefined;
  occupations: Occupation[];
  handleSave: (selected: OtherSkill[]) => void;
}

export default function OtherSkillsSelect(props: Props) {
  const { userOtherSkills, occupations, handleSave } = props;

  const { openModal, closeModal } = useModal();

  const openEdit = () => {
    openModal({
      title: 'Other skills',
      content: (
        <OtherSkillsEdit
          // userOccupations={userOccupationsWithLables}
          userOtherSkills={userOtherSkills || []}
          onSave={selected => {
            handleSave(selected);
            closeModal();
          }}
          onClose={() => closeModal()}
        />
      ),
      onClose: () => {},
    });
  };

  return (
    <div>
      <Label>Other skills</Label>
      {!userOtherSkills?.length ? (
        <Text className="!text-base">
          <span>No other skills selected,</span>
          <span
            role="button"
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            onClick={openEdit}
          >
            click here to add.
          </span>
        </Text>
      ) : (
        <div className="flex flex-col flex-wrap gap-2">
          {userOtherSkills.map((s, index) => (
            <Text key={`${s.escoIdentifier}-${index}`} className="!text-base">
              <span
                role="button"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                onClick={openEdit}
              >
                {/* occupations?.find(o => o.uri === uo.escoIdentifier)?.prefLabel
                  .en || '' */}
                {s.escoIdentifier}
              </span>
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}
