import { ReactNode, UIEvent, useState } from 'react';
import {
  ModalContent,
  ModalFooter,
  ModalTitle,
  Modal as SuomiFiModal,
} from 'suomifi-ui-components';
import useDimensions from '@/lib/hooks/use-dimensions';

interface Props {
  title: string;
  titleVariant?: 'h1' | 'h1hero' | 'h2' | 'h3' | 'h4' | 'h5';
  content: ReactNode;
  footerContent?: ReactNode | ((modalBottomReached: boolean) => JSX.Element);
  closeOnEsc?: boolean;
  closeModal: () => void;
}

export default function Modal(props: Props) {
  const {
    title,
    titleVariant = 'h3',
    content,
    footerContent,
    closeOnEsc = true,
    closeModal,
  } = props;

  const { width } = useDimensions();

  const [bottomReached, setBottomReached] = useState(false);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const bottomReached =
      (e.target as HTMLElement).scrollHeight -
        (e.target as HTMLElement).scrollTop ===
      (e.target as HTMLElement).clientHeight;
    setBottomReached(bottomReached);
  };

  return (
    <SuomiFiModal
      appElementId="__next"
      visible
      variant={width > 640 ? 'default' : 'smallScreen'}
      onEscKeyDown={() => closeOnEsc && closeModal()}
    >
      <ModalContent onScroll={handleScroll}>
        <ModalTitle variant={titleVariant}>{title}</ModalTitle>
        {content}
      </ModalContent>
      {footerContent && (
        <ModalFooter>
          {typeof footerContent === 'function'
            ? footerContent(bottomReached)
            : footerContent}
        </ModalFooter>
      )}
    </SuomiFiModal>
  );
}
