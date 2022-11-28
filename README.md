# PSU, Fall 2022, CS465p Final Project: Socket.io Based Game (TicTacToe)

## How to run app:

1. You will need to build the frontend files first.
   You can do that with:

### `npm run build-react`

2. After that you will have start the express app, which uses these static resources:

### `npm start`

or if you want to do both at once:

### `npm run build-react && npm start`

3. To run the backend tests do:

### `npm run test-backend`

## Libraries used:

You can see the libraries used in package.json, but the main ones are:

```
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"axios": "^1.2.0",
"bootstrap": "^5.2.2",
"express": "4.16.4",
"mocha": "^10.1.0",
"prettier": "^2.7.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-scripts": "^5.0.1",
"should": "^13.2.3",
"socket.io": "^4.5.3",
"socket.io-client": "^4.5.3",
"web-vitals": "^2.1.4"
"eslint": "^8.24.0",
"eslint-config-airbnb-base": "^15.0.0",
"eslint-config-standard": "^17.0.0",
"eslint-plugin-import": "^2.26.0",
"eslint-plugin-n": "^15.3.0",
"eslint-plugin-promise": "^6.0.1",
"eslint-plugin-react": "^7.31.8",
"nodemon": "^2.0.20"
```

we do use two different test frameworks:\
jest for the frontend,\
mocha and should for the backend\
both front and backend use socket.io\
the backend uses express\
the frontend uses react and bootstrap\
eslint for linting

## Tutoaials Used:

I did get some tips on how to write the backend portion from this tutorial:\
[cometchat: how to build a chat app with socket.io/node.js](https://www.cometchat.com/tutorials/how-to-build-a-chat-app-with-socket-io-node-js)

## How to test /join from frontend:

open two tabs \
open devtools in both tabs \
window.socket will contain your socket \
in both tabs' devtools do:

```
  fetch(`/join?socket_id=${window.socket.id}&playerName=player1`).then((response) => response.json()).then((data) => console.log(data));
```

and respectively

```
  fetch(`/join?socket_id=${window.socket.id}&playerName=player2`).then((response) => response.json()).then((data) => console.log(data));
```

on success you will get responses console.logged out like:

```
  {playerName: 'player1', symbol: 'X', gameId: 0}
  {playerName: 'player2', symbol: '0', gameId: 0}
```

in some cases the response may be an erro ( such as 400 response if you didn't send in the query params correctly) \
NOTE: you can of course test with more tabs as well \
TODO: add automated tests for this \
NOTE: also check console output of server to see players array and games arrays and some other output regarding how the game was joined etc for more info

## How to test making moves from frontend:

now that you have a set up game you can start moving via the dev console with:

```
window.socket.emit("move", {"move_id": 0})
```

you should observe the responses that come back to you \
they will tell you if the move is successful or not by the "status" field \
some errors are that the space is already taken, that its not your turn, that the game is not prepared for whatever reason, etc \
when you do win the game, it will let you know by changing the data.gameWinner field from null to one of these values: \
 0 means player 1 won \
 1 means player 2 won \
 2 means game is over and was a draw \
 null means game is still in play \
example of successful win:

```
{
  "status": "success",
  "msg": "player moved to position 8",
  "data": {
    "boardState": [ "X", "O", "O", "", "X", "", "", "", "X" ],
    "gameWinner": 0
  }
}
```

## How to check if the game is ready and what your turn is:

add a handler for event:

```
window.socket.on('opponentAvailable', changeBoardStateToReadyToPlay);
```

or something similar \
the event data will contain something like this for player 1:

```
{
  "status": "ok",
  "msg": "you have an opponent",
  "data": {
    "isYourTurn": true
  }
}
```

and something like this for player 2:

```
{
  "status": "ok",
  "msg": "you have an opponent",
  "data": {
    "isYourTurn": false
  }
}
```

you can use isYourTurn to determine if its your turn or not

## Error codes and errors coming back from backend on `move` event

You will find these error codes in the event data that comes back with the `move_done` event coming from the socket, which looks something like this:

```
{
  "status": "error",
  "msg": "player attempting to play in a game that is not fully initialized or is over. you either dont have an opponent yet or the game is over",
  "errorCode": 3,
  "data": null
}
```

You can use the statusCode to quickly figure out which error you are dealing with.\
You can use the msg if you need s standard text to display in an error dialog or console.log\
\
\
The possible error code values are:

```
error code:
   1 - player attempting to move without being in a game, join this player to a game with GET to /join
   2 - you did not provide a valid move id, you need to provide data that looks like {move_id: move_id}, where move_id is an interger that corresponds to an index in the board array
   3 - player attempting to play in a game that is not fully initialized or is over. you either dont have an opponent yet or the game is over
   4 - player attempting to move to a slot in the game that already has a symbol in it
   5 - player attempting to play out of turn
```

## Sending chat messages to your opponent

To send the chat message you need to use a socket that has already been confirmed to be in an active game with an opponent

```
window.socket.emit("chat", {"message": "whatever you want to say"})
```

\
or something similar \
you will get a notification in both tabs where you are testing under the `chat_done` event data\
the event data will contain something like this for the player sending the message:

```
{
  "status": "ok",
  "msg": "sent message successfully to player",
  "data": {
    "message": "whatever you want to say",
    "from": "John",
    "to": "Tonya"
  }
}
```

and something like this for the player getting the message:

```
{
  "status": "ok",
  "msg": "you have a message",
  "data": {
    "message": "whatever you want to say",
    "from": "John",
    "to": "Tonya"
  }
}
```

## Error codes and errors coming back from backend on `chat` event

You will find these error codes in the event data that comes back with the `chat_done` event coming from the socket, which looks something like this:

```
{
  "status": "error",
  "msg": "player attempting to play in a game that is not fully initialized or is over. you either dont have an opponent yet or the game is ove",
  "errorCode": 3,
  "data": null
}
```

You can use the statusCode to quickly figure out which error you are dealing with.\
You can use the msg if you need a standard text to display in an error dialog or console.log\
\
\
The possible error code values are:

```
error code:
   1 - player attempting to move without being in a game, join this player to a game with GET to /join
   3 - player attempting to play in a game that is not fully initialized or is over. you either dont have an opponent yet or the game is over
   6 - chat message not provided, you need to provide it in the data for the socket under the key "message"
```

## /comments endpoint

### POST to /comments to save the comment

You need to provide the post data as an application/json, for example, like this:

```
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}
const data = {
  name: event.target.name.value,
  email: event.target.email.value,
  comments: event.target.comments.value
};
postData('/comments', data).then((data) => {
  window.alert(`Thank you for connecting ${event.target.name.value}!`);
});
```

the response of this POST will be a JSON array of all comments objects

### GET to /comments endpoint

the response of this POST will be a JSON array of all comments objects
