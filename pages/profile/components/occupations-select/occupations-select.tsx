import { useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { TextInput } from 'suomifi-ui-components';
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
          onCancel={() => closeModal()}
        />
      ),
      onClose: () => {},
    });
  };

  return (
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
  );
}
