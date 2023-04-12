import { Label, Text } from 'suomifi-ui-components';
import type { EscoLanguage, LanguageSkill, LanguageSkillLevel } from '@/types';
import { useModal } from '@/context/modal-context';
import LanguagesEdit from './languages-edit';

interface Props {
  userLanguages: LanguageSkill[] | undefined;
  escoLanguages: EscoLanguage[];
  languageSkillLevels: LanguageSkillLevel[];
  onSelect: (selected: LanguageSkill[]) => void;
}

export default function LanguageSkillsSelect(props: Props) {
  const { userLanguages, onSelect, escoLanguages, languageSkillLevels } = props;

  const { openModal, closeModal } = useModal();

  const openLanguageEdit = () =>
    openModal({
      title: 'Select your language skills',
      content: (
        <LanguagesEdit
          userLanguages={userLanguages}
          escoLanguages={escoLanguages || []}
          languageSkillLevels={languageSkillLevels || []}
          onSave={selected => {
            onSelect(selected);
            closeModal();
          }}
          onClose={closeModal}
        />
      ),
      onClose: () => {},
    });

  return (
    <div>
      <Label>Language skills</Label>
      {!userLanguages?.length ? (
        <Text className="!text-base">
          <span>No languages selected, </span>
          <span
            role="button"
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            onClick={openLanguageEdit}
          >
            click here to add.
          </span>
        </Text>
      ) : (
        <div className="flex flex-col flex-wrap gap-2">
          {userLanguages.map((l, index) => (
            <Text key={`${l.escoIdentifier}-${index}`} className="!text-base">
              <span
                role="button"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                onClick={openLanguageEdit}
              >
                {escoLanguages?.find(
                  el => el.twoLetterISOLanguageName === l.languageCode
                )?.name || ''}{' '}
                (
                {
                  languageSkillLevels?.find(sl => sl.codeValue === l.skillLevel)
                    ?.prefLabel.en
                }
                )
              </span>
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}
