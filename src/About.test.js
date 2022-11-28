import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from './components/About';
import HowToPlay from './components/HowToPlay';
import Form from './components/Form';
import Home from './compoenents/Home';
import Buttons from './components/Buttons';
import ButtonHandler from './components/ButtonHandler';
import Board from './components/Board';

test('About page renders correctly', () => {
  // render About on virtual dom
  render(<About />);

  // elements to test
  const heading = screen.getByTestId('about');
  const p1 = screen.getByTestId('p1');
  const p2 = screen.getByTestId('p2');
  const p3 = screen.getByTestId('p3');
  const p4 = screen.getByTestId('p4');
  const project = screen.getByTestId('link-project');
  const cera_git = screen.getByTestId('cera-git');
  const alex_git = screen.getByTestId('alex-git');
  const ariel_git = screen.getByTestId('ariel-git');

  // interaction
  fireEvent.click(project);
  fireEvent.click(cera_git);
  fireEvent.click(alex_git);
  fireEvent.click(ariel_git);

  // expected results
  expect(heading).toHaveTextContent('About');
  expect(p1).toHaveTextContent(
    'This is a CS465/565 Final Project by Ariel, Cera, and Alex'
  );
  expect(p2).toHaveTextContent(
    'We wanted to implement a game using Node.js, React.js, Express.js, and Socket.io'
  );
  expect(p3).toHaveTextContent('We decided on a Tic-Tac-Toe game');
  expect(p4).toHaveTextContent('Our project code can be found in:');
  expect(project).toHaveAttribute(
    'href',
    'https://github.com/gleason9113/465final'
  );
  expect(project).toHaveAttribute('target', '_blank');
  expect(cera_git).toHaveAttribute('href', 'https://github.com/C3ra906');
  expect(cera_git).toHaveAttribute('target', '_blank');
  expect(alex_git).toHaveAttribute('href', 'https://github.com/sashetov');
  expect(alex_git).toHaveAttribute('target', '_blank');
  expect(ariel_git).toHaveAttribute('href', 'https://github.com/gleason9113');
  expect(ariel_git).toHaveAttribute('target', '_blank');
});

test('How To Play page renders correctly', () => {
  // render About on virtual dom
  render(<HowToPlay />);

  // elements to test
  const heading = screen.getByTestId('how_to_header');

  // interaction

  // expected results
  expect(heading).toHaveTextContent('How To Play Tic-Tac-Toe');
});

test('Connect page renders correctly', () => {
  // render About on virtual dom
  render(<Form />);

  // elements to test

  // interaction

  // expected results
});

test('Buttons render correctly', () => {
  // render About on virtual dom
  render(<Buttons />);

  // elements to test
  const home = screen.getByTestId('home_button');
  const about = screen.getByTestId('about_button');
  const howTo = screen.getByTestId('howToPlay_button');
  const comment = screen.getByTestId('comment');

  // interaction
  fireEvent.click(home);
  fireEvent.click(about);
  fireEvent.click(howTo);
  fireEvent.click(comment);

  // expected results
});

test('ButtonHandler render correctly', () => {
  // render About on virtual dom
  render(<ButtonHandler />);

  // elements to test

  // interaction

  // expected results
});
