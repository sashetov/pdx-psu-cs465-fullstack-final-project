/**
 * @jest-environment jsdom
 */

//Testing for App.js file
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { cleanup, render, screen, within, fireEvent } from '@testing-library/react';
import Banner from './components/Banner';
import Board from './components/Board';
import App from './App';

afterEach(cleanup);

test('render banner', () => {
  render(<Banner />);
  expect(screen.getByText(/Tic-Tac-Toe/)).toBeInTheDocument();
})

it('Clicking on cell 0 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 0");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 1 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 1");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 2 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 2");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 3 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 3");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 4 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 4");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 5 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 5");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 6 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 6");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 7 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 7");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 8 changes text to read X', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 8");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 0 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 0");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 1 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 1");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 2 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 2");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 3 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 3");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 4 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 4");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 5 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 5");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 6 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 6");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 7 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 7");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})

it('Clicking on cell 8 a 2nd time has no effect', () => {
  render(<App />);
  let testCell = screen.getByLabelText("cell 8");
  expect(testCell.innerHTML.trim()).toBe("");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
  userEvent.click(testCell);
  expect(testCell.innerHTML.trim()).toBe("X");
})