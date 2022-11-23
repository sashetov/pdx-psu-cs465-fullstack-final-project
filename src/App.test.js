/**
 * @jest-environment jsdom
 */

//Testing for App.js file
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { cleanup, render, screen, within, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import Banner from './components/Banner';
import Board from './components/Board';
import App from './App';
import { EnzymeAdapter } from 'enzyme';

afterEach(cleanup);


describe("Banner Tests", () => {
  test("Page contains an <h1> element.", () => {
    render(<Banner />);
    const banner = screen.getByRole('heading')
  })

  test("Page contains the correct text.", () => {
    render(<Banner />);
    const banner = screen.getByRole('heading');
    expect(banner).toHaveTextContent('Tic-Tac-Toe');
  })
  
})

describe("Board Tests", () => {
  test(')
})
