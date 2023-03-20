import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, InlineAlert, Text } from 'suomifi-ui-components';
import type { CompanyBasicInformation } from '@/types';
import api from '@/lib/api';
import { useToast } from '@/context/toast-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import Loading from '@/components/ui/loading';
import PreviewExpander from '../components/preview/preview-expander';

const SOURCE_OPTIONS = [
  { labelText: 'Norway', name: 'no', uniqueItemId: 'no' },
  { labelText: 'Sweden', name: 'se', uniqueItemId: 'se' },
  { labelText: 'Finland', name: 'fi', uniqueItemId: 'fi' },
];

interface FormProps {
  nationalIdentifier: string;
  source: string;
}

export default function CompanySearchPage() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormProps>();
  const [companyData, setCompanyData] = useState<
    undefined | CompanyBasicInformation
  >(undefined);
  const [notFound, setNotFound] = useState(false);
  const toast = useToast();

  const onSubmit: SubmitHandler<FormProps> = async values => {
    setNotFound(false);

    try {
      const response = await api.company.getCompanyBasicInfo(values);
      setCompanyData(response);
    } catch (error: any) {
      if (error?.response?.status === 422) {
        setNotFound(true);
        return;
      }
      toast({
        title: 'Error',
        content: error?.message || 'Something went wrong.',
        status: 'error',
      });
    }
  };

  return (
    <Page title="Search companies">
      <Page.Block className="bg-white">
        <div className="flex flex-col gap-4 mb-6">
          <CustomHeading variant="h3">Companies search</CustomHeading>
          <Text>
            Provide a valid national identifier and the source country.
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <FormInput
              name="nationalIdentifier"
              labelText="National identifier"
              control={control}
              rules={{ required: 'Please provide national identifier.' }}
            />
            <FormSingleSelect
              name="source"
              labelText="Select source"
              items={SOURCE_OPTIONS}
              control={control}
              rules={{ required: 'Please provide source.' }}
            />
          </div>
          <Button type="submit" iconRight="search" disabled={isSubmitting}>
            Search
          </Button>
        </form>

        <div className="mt-8 min-h-[100px]">
          {isSubmitting && <Loading />}

          {!isSubmitting && companyData && (
            <PreviewExpander<CompanyBasicInformation>
              title={companyData.name || 'Company details'}
              values={companyData}
            />
          )}

          {!isSubmitting && notFound && (
            <InlineAlert className="mt-4">
              <Text>No company information found with given identifier.</Text>
            </InlineAlert>
          )}
        </div>
      </Page.Block>
    </Page>
  );
}
