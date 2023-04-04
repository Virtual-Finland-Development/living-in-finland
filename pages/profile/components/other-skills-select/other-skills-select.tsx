import { useMemo } from 'react';
import { Label, Text } from 'suomifi-ui-components';
import type { EscoSkill, OtherSkill } from '@/types';
import { useModal } from '@/context/modal-context';
import OtherSkillsEdit from './other-skills-edit';

export interface UserOtherSkill extends OtherSkill {
  label?: string;
}

interface Props {
  userOtherSkills: OtherSkill[] | undefined;
  escoSkills: EscoSkill[];
  handleSave: (selected: OtherSkill[]) => void;
}

export default function OtherSkillsSelect(props: Props) {
  const { userOtherSkills, handleSave, escoSkills } = props;
  const { openModal, closeModal } = useModal();

  const userOtherSkillsWithLabels = useMemo(() => {
    if (userOtherSkills?.length && escoSkills?.length) {
      const skills: UserOtherSkill[] = [];

      for (const s of userOtherSkills) {
        const escoIndex = escoSkills.findIndex(
          skill => skill.uri === s.escoIdentifier
        );
        skills.push({
          ...s,
          label:
            escoIndex > -1
              ? escoSkills[escoIndex].prefLabel.en
              : s.escoIdentifier,
        });
      }
      return skills;
    }
    return [];
  }, [escoSkills, userOtherSkills]);

  const openEdit = () => {
    openModal({
      title: 'Other skills',
      content: (
        <OtherSkillsEdit
          userOtherSkillsWithLabels={userOtherSkillsWithLabels}
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
          <span>No other skills selected, </span>
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
          {userOtherSkillsWithLabels.map((s, index) => (
            <Text key={`${s.escoIdentifier}-${index}`} className="!text-base">
              <span
                role="button"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                onClick={openEdit}
              >
                {s.label}
              </span>
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}
