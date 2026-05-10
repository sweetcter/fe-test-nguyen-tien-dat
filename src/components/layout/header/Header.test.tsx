import { render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('../../ThemeToggle', () => {
  return function MockThemeToggle() {
    return <button data-testid="mock-theme-toggle">Toggle Theme</button>;
  };
});

describe('Component Header', () => {
  it('nên hiển thị đúng tiêu đề của ứng dụng', () => {
    render(<Header />);
    const titleElement = screen.getByText(/Management Task/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('nên hiển thị component ThemeToggle', () => {
    render(<Header />);
    const themeToggle = screen.getByTestId('mock-theme-toggle');
    expect(themeToggle).toBeInTheDocument();
  });
});
