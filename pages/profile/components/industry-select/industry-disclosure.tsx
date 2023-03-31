import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Disclosure } from '@headlessui/react';
import { Checkbox } from 'suomifi-ui-components';
import type { Nace } from '@/types';

interface DisclosureLabelProps {
  item: Nace;
  isOpen: boolean;
  isTopLevel: boolean;
  isChecked: boolean;
  isIndeterminate: boolean;
  onSelect: (
    code: string,
    isChecked: boolean,
    isIndeterminate: boolean
  ) => void;
}

function DisclosureLabel(props: DisclosureLabelProps) {
  const { item, isOpen, isTopLevel, isChecked, isIndeterminate, onSelect } =
    props;

  return isTopLevel ? (
    <Disclosure.Button className="flex flex-row gap-2 items-center justify-center text-left">
      {item.prefLabel.en}
      <span className="mt-1">
        {isOpen ? <IoChevronUp /> : <IoChevronDown />}
      </span>
    </Disclosure.Button>
  ) : (
    <div className="flex flex-row gap-2 items-center justify-items-center text-left">
      <Checkbox
        className="!mr-2 text-start cursor-default"
        checked={isChecked}
        onClick={({ checkboxState }) => {
          console.log(checkboxState);
          onSelect(item.codeValue, checkboxState, isIndeterminate);
        }}
      >
        {item.prefLabel.en}
      </Checkbox>
      {item.children && (
        <Disclosure.Button>
          <span className="mt-1 flex-shrink-0">
            {isOpen ? <IoChevronUp /> : <IoChevronDown />}
          </span>
        </Disclosure.Button>
      )}
    </div>
  );
}

interface IndustryDisclosureProps {
  item: Nace;
  selected: Nace | undefined;
  onSelect: (
    identifier: string,
    checked: boolean,
    isIndeterminate: boolean
  ) => void;
}

export default function IndustryDisclosure(props: IndustryDisclosureProps) {
  const { item, selected, onSelect } = props;

  const isChecked = Boolean(
    selected &&
      (selected.codeValue.startsWith(item.codeValue) ||
        selected.topLevelGroupCode === item.codeValue)
  );

  const isIndeterminate = Boolean(
    selected && isChecked && selected.codeValue !== item.codeValue
  );

  if (item.children) {
    return (
      <Disclosure defaultOpen={isChecked || isIndeterminate}>
        {({ open }) => (
          <>
            <DisclosureLabel
              isTopLevel={isNaN(parseInt(item.codeValue))}
              item={item}
              isOpen={open}
              isChecked={isChecked}
              isIndeterminate={isIndeterminate}
              onSelect={onSelect}
            />
            <Disclosure.Panel>
              {open &&
                item.children?.map(item => (
                  <div
                    key={item.codeValue}
                    className="flex flex-col ml-4 items-start"
                  >
                    <IndustryDisclosure
                      item={item}
                      selected={selected}
                      onSelect={onSelect}
                    />
                  </div>
                ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  return (
    <DisclosureLabel
      isTopLevel={false}
      item={item}
      isOpen
      isChecked={isChecked}
      isIndeterminate={isIndeterminate}
      onSelect={onSelect}
    />
  );
}
