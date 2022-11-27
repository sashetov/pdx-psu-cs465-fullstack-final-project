/**
 * @jest-environment jsdom
 */

//Testing for App.js file
import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen, } from '@testing-library/react';
import Banner from './components/Banner';
import Board from './components/Board';
import Chat from './components/Chat';
import MockedSocket from 'socket.io-mock';

afterEach(cleanup);


describe("Banner Tests", () => {
  test("Page contains an <h1> element.", () => {
    render(<Banner />);
    const banner = screen.getByRole('heading')
    expect(banner).toBeDefined();
  })

  test("Page contains the correct text.", () => {
    render(<Banner />);
    const banner = screen.getByRole('heading');
    expect(banner).toHaveTextContent('Tic-Tac-Toe');
  })
  
})

describe("Board Tests", () => {
  test("Board contains row 0", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("row-0")).toBeTruthy();
  })

  test("Board contains row 1", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("row-1")).toBeTruthy();
  })
  
  test("Board contains row 2", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("row-2")).toBeTruthy();
  })

  test("Board contains cell 0", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 0")).toBeTruthy();
  })
  
  test("Board contains cell 1", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 1")).toBeTruthy();
  })

  test("Board contains cell 2", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 2")).toBeTruthy();
  })

  test("Board contains cell 3", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 3")).toBeTruthy();
  })

  test("Board contains cell 4", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 4")).toBeTruthy();
  })

  test("Board contains cell 5", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 5")).toBeTruthy();
  })

  test("Board contains cell 6", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 6")).toBeTruthy();
  })

  test("Board contains cell 7", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 7")).toBeTruthy();
  })

  test("Board contains cell 8", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 8")).toBeTruthy();
  })
})


describe("Chat Tests", () => {
  test("Checks that Chat component contains a Title component", () => {
    window.HTMLElement.prototype.scrollIntoView = function() {}
    let socket = new MockedSocket();
    render(<Chat socket={socket} />);
    let heading = screen.getByRole('heading');
    expect(heading).toBeDefined();
    expect(heading).toContainHTML('<h5 class="display-5">Chat</h5>');
  })

  test("Checks that Chat component contains a History component", () => {
    window.HTMLElement.prototype.scrollIntoView = function() {}
    let socket = new MockedSocket();
    render(<Chat socket={socket} />);
    let history = screen.getByLabelText("chat-history");
    expect(history).toBeDefined();
    expect(history.getAttribute('aria-label')).toBe('chat-history');
  })



})
