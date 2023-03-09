import { useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Block } from 'suomifi-ui-components';
import type {
  BenecifialOwners,
  NonListedCompany,
  SignatoryRights,
} from '@/types';
import { nullifyUndefinedValues } from '@/lib/utils';
import { useCompanyContext } from '@/context/company-context';
import Loading from '@/components/ui/loading';
import BeneficialOwnersShareSeries from './beneficial-owners-inputs-1-share-series';
import BeneficialOwnersShareholders from './beneficial-owners-inputs-2-share-holders';
import CompanyRegistrant from './company-inputs-1-registrant';
import CompanyDetails from './company-inputs-2-company-details';
import CompanyAddress from './company-inputs-3-company-address';
import CompanyShares from './company-inputs-4-share-series';
import CompanyDirectors from './company-inputs-5-managing-directors';
import CompanyMembers from './company-inputs-6-board-members';
import CompanyAuditor from './company-inputs-7-auditor';
import CompanyWizardNav from './company-wizard-nav';
import FormActionButtons from './form-action-buttons';
import Preview from './preview';
import SignatoryRightsSigninRights from './signatory-rights-inputs-1-signin-rights';

interface FormProps {
  company: Partial<NonListedCompany>;
  beneficialOwners: Partial<BenecifialOwners>;
  signatoryRights: SignatoryRights;
}

const companyWizardSteps = [
  <CompanyRegistrant key="1" />,
  <CompanyDetails key="2" />,
  <CompanyAddress key="3" />,
  <CompanyShares key="4" />,
  <CompanyDirectors key="5" />,
  <CompanyMembers key="6" />,
  <CompanyAuditor key="7" />,
  <BeneficialOwnersShareSeries key="8" />,
  <BeneficialOwnersShareholders key="9" />,
  <SignatoryRightsSigninRights key="10" />,
  <Preview key="11" />,
];

const DEFAULT_VALUES = {
  company: {
    shareSeries: [
      {
        shareSeriesClass: 'A' as const,
      },
    ],
    managingDirectors: [
      {
        role: 'director' as const,
      },
    ],
    boardMembers: [
      {
        role: 'chairperson' as const,
      },
    ],
  },
  beneficialOwners: {
    shareSeries: [
      {
        shareSeriesClass: 'A' as const,
      },
    ],
    shareholders: [
      {
        name: '',
        ownerships: [
          {
            shareSeriesClass: 'A' as const,
          },
        ],
      },
    ],
  },
  signatoryRights: {
    signinRights: [
      {
        givenName: '',
      },
    ],
  },
};

export default function CompanyWizard() {
  const { values, setValues, step, setStep, isLoading } = useCompanyContext();

  /**
   * Form methods, passed to form provider (react-hook-form).
   * Each section of wizard can connect to form context by using 'useFormContext' hook.
   */
  const formMethods = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
  });

  /**
   * Reset values to react-hook-form state, if was provided from company context.
   */
  useEffect(() => {
    if (values) {
      console.log('jesjes!!');
      console.log(values);
      formMethods.reset({ ...values });
    }
  }, [formMethods, values]);

  /**
   * Handle form submission, save values to context.
   */
  const onSubmit: SubmitHandler<FormProps> = useCallback(
    values => {
      const submitValues = nullifyUndefinedValues<Partial<FormProps>>(values);
      setValues(submitValues);
      window.scrollTo(0, 0);
    },
    [setValues]
  );

  /**
   * On form action buttons click (previvous / next / save).
   * Submit form on next step, set current step.
   */
  const onFormActionClick = useCallback(
    (next?: boolean, last?: boolean) => {
      if (next) {
        formMethods.handleSubmit(values => {
          onSubmit(values);
          !last && setStep(step + 1);
        })();
      } else {
        setStep(step - 1);
      }
    },
    [formMethods, onSubmit, setStep, step]
  );

  /**
   * On every wizard nav 'next page' change, execute form submit handler first.
   * This way each page data gets saved to context / inputs gets validated.
   */
  const onWizardNavChange = useCallback(
    (clickedStep: number) => {
      if (clickedStep > step) {
        formMethods.handleSubmit(values => {
          onSubmit(values);
          setStep(clickedStep);
        })();
      } else {
        setStep(clickedStep);
      }
    },
    [formMethods, onSubmit, setStep, step]
  );

  return (
    <FormProvider {...formMethods}>
      <div className="block lg:hidden pb-4 px-4 md:px-0">
        <div className="border border-suomifi-light">
          <CompanyWizardNav onWizardNavChange={onWizardNavChange} />
        </div>
      </div>

      <div className="flex flex-row w-full items-start">
        <div className="hidden lg:block bg-white flex-shrink-0 mr-8 h-full border border-gray-300 py-6">
          <div className="min-w-[240px]">
            <CompanyWizardNav onWizardNavChange={onWizardNavChange} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex w-full align-center justify-center mb-4">
            <Loading />
          </div>
        ) : (
          <Block
            variant="section"
            className="bg-white md:border border-gray-300 flex flex-col w-full px-4 py-6"
          >
            <form>
              {companyWizardSteps[step]}

              <div className="flex flex-row gap-4 mt-14 w-full">
                <FormActionButtons
                  key={step}
                  onFormActionClick={onFormActionClick}
                />
              </div>
            </form>
          </Block>
        )}
      </div>
    </FormProvider>
  );
}
