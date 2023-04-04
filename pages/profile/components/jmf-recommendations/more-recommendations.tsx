import { useEffect, useMemo, useState } from 'react';
import lodash_debounce from 'lodash.debounce';
import { MultiSelect } from 'suomifi-ui-components';
import type { JmfRecommendation } from '@/types';
import useJmfRecommendations from '@/lib/hooks/use-jmf-recommendations';

interface Props {
  onSelect: (selected: any) => void;
  defaultValue: { labelText: string; uniqueItemId: string }[];
}

export default function MoreRecommendations(props: Props) {
  const { onSelect, defaultValue } = props;
  const [textContent, setTextContent] = useState<string | null>('');
  const [cachedOptions, setCachedOptions] = useState<JmfRecommendation[]>([]);

  const {
    data: recommendations,
    isFetching: recommendationsFetching,
    refetch: fetchRecommendations,
  } = useJmfRecommendations(textContent, {
    maxNumberOfSkills: 100,
    maxNumberOfOccupations: 1,
  });

  const loadDebounced = useMemo(
    () => lodash_debounce(fetchRecommendations, 700),
    [fetchRecommendations]
  );

  useEffect(() => {
    if (textContent) {
      loadDebounced();
    } else {
      loadDebounced.cancel();
    }
  }, [loadDebounced, textContent]);

  useEffect(() => {
    if (recommendations?.skills) {
      setCachedOptions(recommendations.skills);
    }
  }, [recommendations?.skills]);

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
        loading={recommendationsFetching}
        loadingText="Loading..."
        items={
          recommendations?.skills
            ? recommendations.skills.map(skill => ({
                labelText: skill.label,
                uniqueItemId: skill.uri,
              }))
            : cachedOptions.map(skill => ({
                labelText: skill.label,
                uniqueItemId: skill.uri,
              }))
        }
        onChange={val => setTextContent(val)}
        onItemSelectionsChange={selected => onSelect(selected)}
        defaultSelectedItems={defaultValue}
        chipListVisible
      />
    </>
  );
}
