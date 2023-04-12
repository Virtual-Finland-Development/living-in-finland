import { useCallback, useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import {
  Button,
  Expander,
  ExpanderContent,
  ExpanderGroup,
  ExpanderTitleButton,
  Text,
} from 'suomifi-ui-components';
import type { Nace } from '@/types';
import { findNace } from '@/lib/utils';
import CustomHeading from '@/components/ui/custom-heading';
import IndustryDisclosure from './industry-disclosure';

interface Props {
  items: Nace[];
  defaultSelected: Nace | undefined;
  onSelect: (selected: Nace | undefined) => void;
  onClose: () => void;
}

export default function IndustryEdit(props: Props) {
  const { items, defaultSelected, onSelect, onClose } = props;
  const [selected, setSelected] = useState<Nace | undefined>(defaultSelected);
  const [openExpander, setOpenExpander] = useState<string | null>(
    defaultSelected?.topLevelGroupCode || null
  );
  const defaultOpenExpanderRef = useRef<null | HTMLDivElement>(null);

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

  // scroll into default opened expander, if defaultSelected is provided and if defaultOpenExpanderRef is defined
  useEffect(() => {
    if (defaultOpenExpanderRef.current) {
      if (typeof defaultOpenExpanderRef.current.scrollIntoView === 'function') {
        defaultOpenExpanderRef.current.scrollIntoView();
      }
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 border p-2 bg-suomifi-blue-bg-light">
        <CustomHeading variant="h4">Industrial group </CustomHeading>

        <Text className="!text-base">
          Select your preferred industrial group. Choice of industrial group
          also includes all lower-level industrial groups
        </Text>

        <div className="py-2 border bg-white h-auto md:h-[300px] overflow-y-auto">
          <div className="mx-2">
            <ExpanderGroup
              closeAllText=""
              openAllText=""
              showToggleAllButton={false}
            >
              {items.map(item => (
                <Expander
                  key={item.codeValue}
                  open={openExpander === item.codeValue}
                  onOpenChange={isOpen =>
                    setOpenExpander(!isOpen ? item.codeValue : null)
                  }
                  {...(defaultSelected?.topLevelGroupCode ===
                    item.codeValue && { ref: defaultOpenExpanderRef })}
                >
                  <ExpanderTitleButton>{item.prefLabel.en}</ExpanderTitleButton>
                  <ExpanderContent>
                    {item.children?.map(item => (
                      <IndustryDisclosure
                        key={item.codeValue}
                        item={item}
                        selected={selected}
                        onSelect={handleSelect}
                      />
                    ))}
                  </ExpanderContent>
                </Expander>
              ))}
            </ExpanderGroup>
          </div>
        </div>

        {selected && (
          <div className="flex items-start mt-2">
            <div
              className="flex flex-row items-center gap-2 bg-suomifi-light hover:bg-suomifi-light-hover text-white font-bold rounded-xl px-2"
              role="button"
              onClick={() => setSelected(undefined)}
            >
              <span>{selected.prefLabel.en}</span>
              <IoClose
                className="flex-shrink-0"
                role="button"
                tabIndex={0}
                aria-label="Remove selected industry"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-3 mt-4">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => onSelect(selected)}>Select</Button>
      </div>
    </>
  );
}
