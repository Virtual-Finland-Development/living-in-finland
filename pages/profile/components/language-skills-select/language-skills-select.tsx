import { Label, Text } from 'suomifi-ui-components';
import type { LanguageSkill } from '@/types';
import { useEscoLanguages, useLanguageSkillLevels } from '@/lib/hooks/codesets';
import { useModal } from '@/context/modal-context';
import Loading from '@/components/ui/loading';
import LanguagesEdit from './languages-edit';

interface Props {
  userLanguages: LanguageSkill[] | undefined;
  onSelect: (selected: LanguageSkill[]) => void;
}

export default function LanguageSkillsSelect(props: Props) {
  const { userLanguages, onSelect } = props;

  const { data: escoLanguages, isLoading: escoLanguagesLoading } =
    useEscoLanguages();
  const { data: languageSkillLevels, isLoading: languageSkillLevelsLoading } =
    useLanguageSkillLevels();

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
          onCancel={closeModal}
        />
      ),
      onClose: () => {},
    });

  if (escoLanguagesLoading || languageSkillLevelsLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Label>Language skills</Label>
      {!userLanguages?.length ? (
        <Text className="!text-base">
          <span>No languages selected,</span>
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
