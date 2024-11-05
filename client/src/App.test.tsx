import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My Budget Planner heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/My Budget Planner/i);
  expect(headingElement).toBeInTheDocument();
});
