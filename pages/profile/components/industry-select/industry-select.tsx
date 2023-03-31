import { useMemo } from 'react';
import { Text } from 'suomifi-ui-components';
import { Label } from 'suomifi-ui-components';
import type { Nace } from '@/types';
import { useNaceCodes } from '@/lib/hooks/codesets';
import { findNace, getGroupedNaceCodes } from '@/lib/utils';
import { useModal } from '@/context/modal-context';
import Loading from '@/components/ui/loading';
import IndustryEdit from './industry-edit';

interface Props {
  userNaceCode: string | undefined | null;
  handleSelect: (selected: Nace | undefined) => void;
}

export default function IndustrySelect(props: Props) {
  const { userNaceCode, handleSelect } = props;

  const { data: naceCodes, isLoading: naceCodesLoading } = useNaceCodes();

  const groupedNaceCodes = useMemo(
    () => getGroupedNaceCodes(naceCodes || []),
    [naceCodes]
  );

  const { openModal, closeModal } = useModal();

  const openNaceSelect = () =>
    openModal({
      title: 'Select your preferred industry',
      content: (
        <IndustryEdit
          items={groupedNaceCodes}
          defaultSelected={
            userNaceCode ? findNace(groupedNaceCodes, userNaceCode) : undefined
          }
          onSelect={selected => {
            handleSelect(selected);
            closeModal();
          }}
          onCancel={closeModal}
        />
      ),
      onClose: () => {},
    });

  if (naceCodesLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Label>Preferred industry</Label>
      <Text className="!text-base">
        {!userNaceCode && <span>No industry selected, </span>}
        <span
          role="button"
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          onClick={openNaceSelect}
        >
          {!userNaceCode
            ? 'click here to add.'
            : findNace(naceCodes || [], userNaceCode)?.prefLabel.en ||
              'undefined industry'}
        </span>
      </Text>
    </div>
  );
}
