import { useEffect, useMemo, useState } from 'react';
import lodash_debounce from 'lodash.debounce';
import { MultiSelect } from 'suomifi-ui-components';
import useJmfRecommendations from '@/lib/hooks/use-jmf-recommendations';

interface Props {
  type: 'occupations' | 'skills';
  onSelect: (selected: any) => void;
  defaultValue: { labelText: string; uniqueItemId: string }[];
}

export default function MoreRecommendations(props: Props) {
  const { type, onSelect, defaultValue } = props;
  const [textContent, setTextContent] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: recommendations,
    isFetching: recommendationsFetching,
    refetch: fetchRecommendations,
  } = useJmfRecommendations(textContent, {
    maxNumberOfSkills: type === 'skills' ? 100 : 1,
    maxNumberOfOccupations: type === 'occupations' ? 100 : 1,
  });

  const loadDebounced = useMemo(
    () => lodash_debounce(fetchRecommendations, 700),
    [fetchRecommendations]
  );

  useEffect(() => {
    if (textContent) {
      setIsLoading(true);
      loadDebounced();
    } else {
      setIsLoading(false);
      loadDebounced.cancel();
    }
  }, [loadDebounced, textContent]);

  useEffect(() => {
    if (!recommendationsFetching) {
      setIsLoading(false);
    }
  }, [recommendationsFetching]);

  return (
    <>
      {/*
          // @ts-ignore */}
      <MultiSelect
        className="!w-full"
        labelText="Search related skills"
        visualPlaceholder="Type to search"
        itemAdditionHelpText=""
        ariaOptionsAvailableText="options available"
        ariaSelectedAmountText="option selected"
        ariaChipActionLabel="Remove"
        ariaOptionChipRemovedText="removed"
        noItemsText="Search for options" // <-- need to use ts-ignore above, because this prop is wrongly typed...
        loading={isLoading}
        loadingText="Loading..."
        items={
          recommendations?.skills
            ? recommendations.skills.map(skill => ({
                labelText: skill.label,
                uniqueItemId: skill.uri,
              }))
            : []
        }
        onChange={val => setTextContent(val)}
        onItemSelectionsChange={selected => onSelect(selected)}
        defaultSelectedItems={defaultValue}
        chipListVisible
      />
    </>
  );
}
