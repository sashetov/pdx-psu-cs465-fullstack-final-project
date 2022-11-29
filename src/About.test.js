import {
  render,
  fireEvent,
  screen,
  within,
  userEvent,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import MockedSocket from 'socket.io-mock';
import About from './components/About';
import HowToPlay from './components/HowToPlay';
import Form from './components/Form';
import Home from './components/Home';
import Buttons from './components/Buttons';
import Board from './components/Board';
import Comments from './components/Comments';
import ButtonHandler from './components/ButtonHandler';

// Tests ButtonHandler render to match snapshot
test('ButtonHanddler render to match snapshot', () => {
  // Mock socket
  const socket = new MockedSocket();

  // render
  const buttonHandler = renderer
    .create(<ButtonHandler socket={socket} />)
    .toJSON();

  // expected results
  expect(buttonHandler).toMatchSnapshot();
});

// Tests Buttons
test('Buttons function correctly', () => {
  //this one passes
  // Mock functions
  const handleHome = jest.fn();
  const handleAbout = jest.fn();
  const handleConnect = jest.fn();
  const handleHowToPlay = jest.fn();
  const handleComments = jest.fn();

  // render About on virtual dom
  render(
    <Buttons
      handleHome={handleHome}
      handleAbout={handleAbout}
      handleConnect={handleConnect}
      handleHowToPlay={handleHowToPlay}
      handleComments={handleComments}
    />
  );

  // buttons to test
  const home = screen.getByTestId('home_button');
  const about = screen.getByTestId('about_button');
  const howTo = screen.getByTestId('howToPlay_button');
  const connect = screen.getByTestId('connect_button');
  const comment = screen.getByTestId('comment_button');

  // interaction
  fireEvent.click(home);
  fireEvent.click(about);
  fireEvent.click(howTo);
  fireEvent.click(connect);
  fireEvent.click(comment);

  // expected results
  expect(home).toBeDefined();
  expect(about).toBeDefined();
  expect(howTo).toBeDefined();
  expect(connect).toBeDefined();
  expect(comment).toBeDefined();

  expect(handleHome).toHaveBeenCalledTimes(1);
  expect(handleAbout).toHaveBeenCalledTimes(1);
  expect(handleHowToPlay).toHaveBeenCalledTimes(1);
  expect(handleConnect).toHaveBeenCalledTimes(1);
  expect(handleComments).toHaveBeenCalledTimes(1);
});

// Buttons render to match snapshot
test('Buttons render to match snapshot', () => {
  // Mock functions
  const handleHome = jest.fn();
  const handleAbout = jest.fn();
  const handleConnect = jest.fn();
  const handleHowToPlay = jest.fn();
  const handleComments = jest.fn();

  // render
  const buttons = renderer
    .create(
      <Buttons
        handleHome={handleHome}
        handleAbout={handleAbout}
        handleConnect={handleConnect}
        handleHowToPlay={handleHowToPlay}
        handleComments={handleComments}
      />
    )
    .toJSON();

  // expected results
  expect(buttons).toMatchSnapshot();
});

// Tests About page rendering
test('About page renders correctly', () => {
  // this one passes
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

// About render to match snapshot
test('About render to match snapshot', () => {
  // render
  const about = renderer.create(<About />).toJSON();

  // expected results
  expect(about).toMatchSnapshot();
});

// Tests How To Play page rendering
test('How To Play page renders correctly', () => {
  // render HowToPlay on virtual dom
  render(<HowToPlay />);

  // elements to test
  const heading = screen.getByTestId('how_to_header');
  const two = screen.getByTestId('two_players');
  const rules = screen.getByTestId('rules');
  const list = screen.getByTestId('list_of_rules');
  const { getAllByRole } = within(list); // issue in ariel's side
  const rule_list = getAllByRole('listitem');
  const wins = screen.getByTestId('wins');
  const ties = screen.getByTestId('ties');

  // expected results
  expect(rule_list.length).toBe(9); // possible issue
  expect(heading).toHaveTextContent('How to Play Tic-Tac-Toe');
  expect(two).toHaveTextContent('This game is played with two players');
  expect(rules).toHaveTextContent('Rules:');
  expect(wins).toHaveTextContent('Example Wins:');
  expect(ties).toHaveTextContent('Example Tied Conditions:');
});

// HowToPlay render to match snapshot
test('HowToPlay render to match snapshot', () => {
  // render
  const howTo = renderer.create(<HowToPlay />).toJSON();

  // expected results
  expect(howTo).toMatchSnapshot();
});

// Home render to match snapshot
test('Home render to match snapshot', () => {
  const socket = new MockedSocket();
  const newGame = true;
  const first_player = 'A';
  const second_player = 'B';
  const gameFinished = false;
  // render
  const home = renderer
    .create(
      <Home
        socket={socket}
        first_player={first_player}
        second_player={second_player}
        newGame={newGame}
        gameFinished={gameFinished}
      />
    )
    .toJSON();

  // expected results
  expect(home).toMatchSnapshot();
});

test('Connect page renders correctly', () => {
  // render Form on virtual dom
  render(<Form />);

  // elements to test
  const name = screen.getByTestId('name');
  const name_label = screen.getByTestId('name-label');
  const email = screen.getByTestId('email');
  const email_label = screen.getByTestId('email-label');
  const comments = screen.getByTestId('comments');
  const comments_label = screen.getByTestId('comments-label');
  const submit = screen.getByTestId('submit');
  const reset = screen.getByTestId('reset');

  const handleSubmit = jest.fn();

  // interaction
  fireEvent.click(reset);
  userEvent.click(submit);

  // expected results
  expect(submit).toBeDefined();
  expect(reset).toBeDefined();

  expect(handleSubmit).toHaveBeenCalledTimes(1);

  expect(name_label).toHaveTextContent('Name');
  expect(email_label).toHaveTextContent('Email');
  expect(comments_label).toHaveTextContent('Comments');
});

// Connect render to match snapshot
test('Connect render to match snapshot', () => {
  // render
  const connect = renderer.create(<Form />).toJSON();

  // expected results
  expect(connect).toMatchSnapshot();
});

// Comments render to match snapshot
test('Comments render to match snapshot', () => {
  // render
  const comments = renderer.create(<Comments />).toJSON();

  // expected results
  expect(comments).toMatchSnapshot();
});

// Comments page renders correctly without any comments
test('Comments page renders corretly without any comments', () => {
  // render About on virtual dom
  render(<Comments />);

  // elements to test
  const header = screen.getByTestId('comments_header');
  const explain = screen.getByTestId('comments_explain');
  const display = screen.getByTestId('comments_display');

  // expected results
  expect(header).toHaveTextContent('Comments');
  expect(explain).toHaveTextContent(
    'You can leave us comments by filling out the form in the Connect page!'
  );
  expect(display).toHaveTextContent('No comments received');
});
