import { useCallback, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Button, Text } from 'suomifi-ui-components';
import type { Nace } from '@/types';
import { findNace } from '@/lib/utils';
import CustomHeading from '@/components/ui/custom-heading';
import NaceDisclosure from './nace-disclosure';

interface Props {
  items: Nace[];
  defaultSelected: Nace | undefined;
  onSelect: (selected: Nace | undefined) => void;
  onCancel: () => void;
}

export default function NaceSelect(props: Props) {
  const { items, defaultSelected, onSelect, onCancel } = props;
  const [selected, setSelected] = useState<Nace | undefined>(defaultSelected);

  const handleSelect = useCallback(
    (identifier: string, isChecked: boolean, isIndeterminate: boolean) => {
      if (isChecked || isIndeterminate) {
        return setSelected(findNace(items, identifier));
      } else {
        return setSelected(undefined);
      }
    },
    [items]
  );

  return (
    <>
      <div className="flex flex-col gap-2 border p-2 bg-suomifi-blue-bg-light">
        <CustomHeading variant="h4">Industrial group </CustomHeading>

        <Text className="!text-base">
          Select your preferred industrial group. Choice of industrial group
          also includes all lower-level industrial groups
        </Text>

        <div className="py-2 border bg-white h-auto md:h-[300px] overflow-y-auto">
          <div className="flex flex-col gap-1 items-start mx-2">
            {items.map(item => (
              <NaceDisclosure
                key={item.codeValue}
                item={item}
                selected={selected}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        {selected && (
          <div className="flex items-start mt-2">
            <div className="flex flex-row items-center gap-2 bg-suomifi-light text-white font-bold rounded-md px-2">
              <span>{selected.prefLabel.en}</span>
              <IoClose
                className="flex-shrink-0"
                role="button"
                tabIndex={0}
                aria-label="Remove selected industry"
                onClick={() => setSelected(undefined)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSelect(selected)}>Select</Button>
      </div>
    </>
  );
}
