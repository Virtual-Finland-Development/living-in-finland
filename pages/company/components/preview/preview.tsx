import { useRouter } from 'next/router';
import { useCompanyContext } from '@/context/company-context';
import CustomHeading from '@/components/ui/custom-heading';
import PreviewExpander from './preview-expander';

interface Props {
  previewType: 'all' | 'company' | 'beneficialOwners' | 'signatoryRights';
  stageHeader?: string;
}

export default function Preview(props: Props) {
  const { previewType, stageHeader } = props;
  const { clearValues } = useCompanyContext();
  const router = useRouter();
  const { nationalIdentifier } = router.query;
  const editUrlBase = !nationalIdentifier
    ? '/company/establishment'
    : `/company/edit/${nationalIdentifier}`;

  return (
    <div className="flex flex-col gap-4 w-full">
      {previewType !== 'all' && (
        <div>
          {stageHeader && (
            <CustomHeading variant="h4">{stageHeader}</CustomHeading>
          )}
          <CustomHeading variant="h2">Preview</CustomHeading>
        </div>
      )}

      {['all', 'company'].includes(previewType) && (
        <PreviewExpander
          type="company"
          title={previewType === 'all' ? '1. Details' : 'Details'}
          showEditButtons={previewType === 'all'}
          onEditClick={() => router.push(`${editUrlBase}/details`)}
          onClearClick={() => {
            clearValues('company');
            window.scrollTo(0, 0);
          }}
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
          onClearClick={() => {
            clearValues('beneficialOwners');
            window.scrollTo(0, 0);
          }}
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
          onClearClick={() => {
            clearValues('signatoryRights');
            window.scrollTo(0, 0);
          }}
        />
      )}
    </div>
  );
}
