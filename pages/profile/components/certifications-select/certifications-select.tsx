import { Label, Text } from 'suomifi-ui-components';
import type { Certification } from '@/types';
import { useModal } from '@/context/modal-context';
import CertificationsEdit from './certifications-edit';

interface Props {
  userCertifications: Certification[] | undefined;
  onSelect: (selected: Certification[]) => void;
}

export default function CertificationsSelect(props: Props) {
  const { userCertifications, onSelect } = props;

  const { openModal, closeModal } = useModal();

  const openEdit = () =>
    openModal({
      title: 'Add your certifications',
      content: (
        <CertificationsEdit
          userCertifications={userCertifications || []}
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
      <Label>Certifications</Label>
      {!userCertifications?.length ? (
        <Text className="!text-base">
          <span>No certifications added, </span>
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
          {userCertifications.map((c, index) => (
            <Text key={`${c.escoIdentifier}-${index}`} className="!text-base">
              <span
                role="button"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                onClick={openEdit}
              >
                {c.certificationName}
              </span>
            </Text>
          ))}
        </div>
      )}
    </div>
  );
}
