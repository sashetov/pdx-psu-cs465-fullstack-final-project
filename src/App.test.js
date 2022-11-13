/**
 * @jest-environment jsdom
 */

//Testing for App.js file
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Banner from './components/Banner';

test('render banner', () => {
  render(<Banner />);
  expect(screen.getByText(/Tic-Tac-Toe/)).toBeInTheDocument();
})