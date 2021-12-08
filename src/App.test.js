import { render, screen } from '@testing-library/react';
import App from './App';

test('check startup render', () => {
  render(<App />);
  const linkElement = screen.getByText(/Cuisine Street/i);
  expect(linkElement).toBeInTheDocument();
});
