import { ReactNode } from 'react';
import { Heading, HeadingProps } from 'suomifi-ui-components';
import tw, { styled } from 'twin.macro';

type SuomiFiBlue = 'light' | 'dark';

const colorVariant = (color: SuomiFiBlue) =>
  color === 'light' ? tw`text-suomifi-light` : tw`text-suomifi-dark`;

const StyledHeading = styled(Heading)<{
  suomiFiBlue?: SuomiFiBlue;
  center?: boolean;
}>(({ suomiFiBlue, center }) => [
  tw`text-inherit`,
  center && tw`text-center`,
  suomiFiBlue && colorVariant(suomiFiBlue),
]);

interface Props extends HeadingProps {
  children: ReactNode;
  suomiFiBlue?: SuomiFiBlue;
  center?: boolean;
}

export default function CustomHeading(props: Props) {
  const { children, variant, suomiFiBlue, center } = props;

  return (
    <StyledHeading variant={variant} suomiFiBlue={suomiFiBlue} center={center}>
      {children}
    </StyledHeading>
  );
}
