import { render, screen } from '@testing-library/react';
import HomePage from '../pages/index.page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', {
      name: /the only service you need for moving into Finland/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
