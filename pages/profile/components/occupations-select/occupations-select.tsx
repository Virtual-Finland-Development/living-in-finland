import { useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { Label, Text, TextInput } from 'suomifi-ui-components';
import type { Occupation, UserOccupation } from '@/types';
import { useModal } from '@/context/modal-context';
import OccupationsEdit from './occupations-edit';

export interface UserOccupationSelection extends Partial<UserOccupation> {
  label?: string;
  // delete?: boolean;
  // id?: string;
}

interface Props {
  userOccupations: UserOccupation[] | undefined;
  occupations: Occupation[];
  handleSave: (selected: UserOccupationSelection[]) => void;
}

export default function OccupationsSelect(props: Props) {
  const { userOccupations, occupations, handleSave } = props;

  const { openModal, closeModal } = useModal();

  // add labels to user occupations
  const userOccupationsWithLables = useMemo(() => {
    if (!userOccupations?.length || !occupations) return [];

    return (
      userOccupations
        // .filter(o => !o.delete)
        .map(o => ({
          ...o,
          label:
            occupations.find(option => option.uri === o.escoIdentifier)
              ?.prefLabel?.en || '',
        }))
    );
  }, [occupations, userOccupations]);

  const openEdit = () => {
    openModal({
      title: 'Occupations',
      content: (
        <OccupationsEdit
          userOccupations={userOccupationsWithLables}
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

  /* return (
    <div className="relative">
      <TextInput
        labelText="Occupations"
        readOnly
        visualPlaceholder="No occupations selected, click to add"
        aria-placeholder="No occuaptions selected, click button to add."
        onClick={openEdit}
      />
      <IoAdd
        size="26"
        className="absolute top-[41px] right-0 text-suomifi-light"
        role="button"
        tabIndex={0}
        onClick={openEdit}
      />
    </div>
  ); */

  return (
    <div>
      <Label>Occupations</Label>
      {!userOccupations?.length ? (
        <Text className="!text-base">
          <span>No languages selected, </span>
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
          {userOccupations.map((uo, index) => (
            <Text key={`${uo.escoIdentifier}-${index}`} className="!text-base">
              <span
                role="button"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                onClick={openEdit}
              >
                {occupations?.find(o => o.uri === uo.escoIdentifier)?.prefLabel
                  .en || ''}
              </span>
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}
