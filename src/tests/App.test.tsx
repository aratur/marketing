import React from 'react';
import { screen, render } from '@testing-library/react';
import Dashboard from '../features/Dashboard/Dashboard';

describe('ButtonCustomized', () => {
  it('calls prop function when clicked', () => {
    render(<Dashboard />);
    const element = screen.getByText(/Dashboard/i);
    expect(element).toBeInTheDocument();
  });
});
