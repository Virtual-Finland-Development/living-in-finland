import { useRouter } from 'next/router';
import { useCompanyContext } from '@/context/company-context';
import CustomHeading from '@/components/ui/custom-heading';
import PreviewExpander from './preview-expander/preview-expander';

interface Props {
  previewType: 'all' | 'company' | 'beneficialOwners' | 'signatoryRights';
  isCompanyEdit?: boolean;
}

export default function Preview(props: Props) {
  const { previewType, isCompanyEdit } = props;
  const { clearValues } = useCompanyContext();
  const router = useRouter();
  const { businessId } = router.query;
  const editUrlBase = !isCompanyEdit
    ? '/company/establishment'
    : `/company/edit/${businessId}`;

  return (
    <div className="flex flex-col gap-4 w-full">
      {previewType !== 'all' && (
        <CustomHeading variant="h2">Preview</CustomHeading>
      )}

      {['all', 'company'].includes(previewType) && (
        <PreviewExpander
          type="company"
          title={previewType === 'all' ? '1. Details' : 'Details'}
          showEditButtons={previewType === 'all'}
          onEditClick={() => router.push(`${editUrlBase}/details`)}
          onClearClick={() => clearValues('company')}
        />
      )}

      {['all', 'beneficialOwners'].includes(previewType) && (
        <PreviewExpander
          type="beneficialOwners"
          title={
            previewType === 'all' ? '2. Beneficial owners' : 'Beneficial owners'
          }
          showEditButtons={previewType === 'all'}
          onEditClick={() => router.push(`${editUrlBase}/beneficial-owners`)}
          onClearClick={() => clearValues('beneficialOwners')}
        />
      )}

      {['all', 'signatoryRights'].includes(previewType) && (
        <PreviewExpander
          type="signatoryRights"
          title={
            previewType === 'all' ? '3. Signatory rights' : 'Signatory rights'
          }
          showEditButtons={previewType === 'all'}
          onEditClick={() => router.push(`${editUrlBase}/signatory-rights`)}
          onClearClick={() => clearValues('signatoryRights')}
        />
      )}
    </div>
  );
}
