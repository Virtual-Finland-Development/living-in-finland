import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import { useCompanyContext } from '@/context/company-context';

interface Props {
  onFormActionClick: (next?: boolean) => void;
  isLastStep: boolean;
}

export default function CompanyWizardActionButtons(props: Props) {
  const { onFormActionClick, isLastStep } = props;
  const { step } = useCompanyContext();
  const {
    formState: { errors },
  } = useFormContext();
  const router = useRouter();
  const { businessId } = router.query;
  const companyRouteUrl = !businessId
    ? '/company/establishment'
    : `/company/edit/${businessId}`;

  const buttonsDisabled = Boolean(Object.keys(errors).length);

  const onNextClick = () => {
    if (isLastStep) {
      router.push(companyRouteUrl);
    } else {
      onFormActionClick(true);
    }
  };

  return (
    <>
      {step && step > 0 && step < 10 ? (
        <Button
          variant="secondary"
          icon="arrowLeft"
          onClick={() => onFormActionClick()}
        >
          Previous
        </Button>
      ) : null}
      <Button
        iconRight="arrowRight"
        onClick={onNextClick}
        disabled={buttonsDisabled}
      >
        Next
      </Button>
    </>
  );
}
