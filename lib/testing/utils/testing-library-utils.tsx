import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { AuthProvider } from '@/context/auth-context';
import { ModalProvider } from '@/context/modal-context';
import { ToastProvider } from '@/context/toast-context';

const queryClient = new QueryClient();

interface WrapperProps {
  children: ReactElement;
  authenticated?: boolean;
}

// Custom render
// Wrap with context providers
const WrapperWithProviders = ({ children, authenticated }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider authenticated={authenticated}>
      <ModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </ModalProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { authenticated?: boolean }
) =>
  render(ui, {
    wrapper: (props: any) => (
      <WrapperWithProviders {...props} authenticated={options?.authenticated} />
    ),
    ...options,
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithProviders };
