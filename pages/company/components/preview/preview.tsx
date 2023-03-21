import { useRouter } from 'next/router';
import { BenecifialOwners, NonListedCompany, SignatoryRights } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import type { Step } from '@/context/company-context';
import CustomHeading from '@/components/ui/custom-heading';
import PreviewExpander from './preview-expander';

interface Props {
  previewType: 'all' | 'company' | 'beneficialOwners' | 'signatoryRights';
  stageHeader?: string;
}

function isAllStepsDone(
  type: 'company' | 'beneficialOwners' | 'signatoryRights',
  doneSteps: Record<Step, boolean>
) {
  const trackedDoneSteps = Object.keys(doneSteps)
    .filter(key => key.includes(type))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: doneSteps[key as Step] });
    }, {});
  const doneStepValues = Object.values(trackedDoneSteps);
  const allStepsDone = doneStepValues.every(isDone => isDone);
  return allStepsDone;
}

export default function Preview(props: Props) {
  const { previewType, stageHeader } = props;
  const {
    clearValues,
    values: { company, beneficialOwners, signatoryRights },
    doneSteps,
  } = useCompanyContext();
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
        <PreviewExpander<Partial<NonListedCompany>>
          title={previewType === 'all' ? '1. Details' : 'Details'}
          values={company}
          allStepsDone={isAllStepsDone('company', doneSteps)}
          showEditButtons={previewType === 'all'}
          onEditClick={() => router.push(`${editUrlBase}/details`)}
          onClearClick={() => {
            clearValues('company');
            window.scrollTo(0, 0);
          }}
        />
      )}

      {['all', 'beneficialOwners'].includes(previewType) && (
        <PreviewExpander<Partial<BenecifialOwners>>
          title={
            previewType === 'all' ? '2. Beneficial owners' : 'Beneficial owners'
          }
          values={beneficialOwners}
          allStepsDone={isAllStepsDone('beneficialOwners', doneSteps)}
          showEditButtons={previewType === 'all'}
          onEditClick={() => router.push(`${editUrlBase}/beneficial-owners`)}
          onClearClick={() => {
            clearValues('beneficialOwners');
            window.scrollTo(0, 0);
          }}
        />
      )}
      {['all', 'signatoryRights'].includes(previewType) && (
        <PreviewExpander<SignatoryRights>
          title={
            previewType === 'all' ? '3. Signatory rights' : 'Signatory rights'
          }
          values={signatoryRights}
          allStepsDone={isAllStepsDone('signatoryRights', doneSteps)}
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
