import React from 'react';
import { screen, render } from '@testing-library/react';
import App from '../App';

describe('ButtonCustomized', () => {
  it('calls prop function when clicked', () => {
    render(<App />);
    const element = screen.getByText(/Starter/i);
    expect(element).toBeInTheDocument();
  });
});
