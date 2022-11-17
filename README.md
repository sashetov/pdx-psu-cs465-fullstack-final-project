# PSU, Fall 2022, CS465p Final Project: Socket.io Based Game (TicTacToe)

## How to run app:
1. You will need to build the frontend files first.
You can do that with:
### `npm run build-react`

2. After that you will have start the express app, which uses these static resources:
### `npm start`

or if you want to do both at once:

### `npm run build-react && npm start`

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
  {playerName: 'player1', symbol: '0', gameId: 0}
  {playerName: 'player2', symbol: '0', gameId: 0}
```
in some cases the response may be an erro ( such as 400 response if you didn't send in the query params correctly) \
NOTE: you can of course test with more tabs as well \
TODO: add automated tests for this \
NOTE: also check console output of server to see players array and games arrays and some other output regarding how the game was joined etc for more info \

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
example of successful win: \
{
  "status": "success",
  "msg": "player moved to position 8",
  "data": {
    "boardState": [ "X", "O", "O", "", "X", "", "", "", "X" ],
    "gameWinner": 0
  }
}
