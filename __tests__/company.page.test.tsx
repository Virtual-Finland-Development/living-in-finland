import CompanyPage from '@/pages/company/index.page';
import {
  renderWithProviders,
  screen,
} from '@/lib/testing/utils/testing-library-utils';

describe('Company index page', () => {
  it('renders a identification button, if user is not authenticated', () => {
    renderWithProviders(<CompanyPage />, { authenticated: false });

    const loginButton = screen.getByRole('button', {
      name: /identification/i,
    });

    expect(loginButton).toBeInTheDocument();
  });

  it('renders a company establishment button, if user is authenticated', () => {
    renderWithProviders(<CompanyPage />, { authenticated: true });

    const establishCompanyButton = screen.getByRole('button', {
      name: /establish company/i,
    });

    expect(establishCompanyButton).toBeInTheDocument();
  });
});
