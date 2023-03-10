import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import tw from 'twin.macro';
import { AuthConsumer, AuthProvider } from '@/context/auth-context';
import { ModalProvider } from '@/context/modal-context';
import { ToastProvider } from '@/context/toast-context';
import MainLayout from '@/components/layout/main-layout';
import Loading from '@/components/ui/loading';
import 'suomifi-ui-components/dist/main.css';
import '@/styles/globals.css';
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';

type ExtendedAppProps = AppProps & {
  Component: NextComponentType & { provider?: FC<PropsWithChildren> };
};

const queryClient = new QueryClient();

const Container = tw.div`container flex items-center justify-center h-screen`;

const NoProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export default function App({ Component, pageProps }: ExtendedAppProps) {
  const ComponentContextProvider = Component.provider || NoProvider;
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Head>
          <title>Virtual Finland</title>
          <meta name="description" content="Virtual Finland demo app" />
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
                <ToastProvider>
                  <MainLayout>
                    <ComponentContextProvider>
                      <Component {...pageProps} />
                    </ComponentContextProvider>
                  </MainLayout>
                </ToastProvider>
              </ModalProvider>
            );
          }}
        </AuthConsumer>
      </AuthProvider>
    </QueryClientProvider>
  );
}
