import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, ReactNode } from 'react';
import tw from 'twin.macro';
import { AuthConsumer, AuthProvider } from '@/context/auth-context';
import { ModalProvider } from '@/context/modal-context';
import MainLayout from '@/components/layout/main-layout';
import Loading from '@/components/ui/loading';
import 'suomifi-ui-components/dist/main.css';
import '@/styles/globals.css';
import 'react-phone-number-input/style.css';

type ExtendedAppProps = AppProps & {
  Component: NextComponentType & { provider?: FC<PropsWithChildren> };
};

const Container = tw.div`container flex items-center justify-center h-screen`;

const NoProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export default function App({ Component, pageProps }: ExtendedAppProps) {
  const ComponentContextProvider = Component.provider || NoProvider;
  const router = useRouter();

  return (
    <AuthProvider>
      <Head>
        <title>Living in Finland</title>
        <meta name="description" content="Living in Finland demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthConsumer>
        {provider => {
          if (!provider) {
            return null;
          }

          if (provider.isLoading) {
            return (
              <Container>
                <Loading />
              </Container>
            );
          }

          if (router.pathname === '/auth') {
            return (
              <Container>
                <Component {...pageProps} />
              </Container>
            );
          }

          return (
            <ModalProvider>
              <MainLayout>
                <ComponentContextProvider>
                  <Component {...pageProps} />
                </ComponentContextProvider>
              </MainLayout>
            </ModalProvider>
          );
        }}
      </AuthConsumer>
    </AuthProvider>
  );
}
