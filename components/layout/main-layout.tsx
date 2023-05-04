import { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from './footer';
import MainNavigation from './main-navigation';

const Container = styled.div.attrs({
  className: 'container flex flex-col h-full flex-1 md:px-4',
})``;

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <MainNavigation />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
