require("should");
const http = require("http");
const axios = require('axios')
const util = require("util");
const baseUrl = 'http://localhost:8080';
const fs = require('fs');
let server, sockets = [];
let startApp = (done) => {
  server = require("../server/index.js");
  done();
},
stopApp = (done) =>{
  server.closeServer();
  done();
},
log = (msg) => { // used for debugging
  fs.appendFileSync('tests.log', JSON.stringify(msg) + "\n");
},
testBothJoinSuccessfully = (done) => {
  sockets[0] = require('socket.io-client')(baseUrl);
  sockets[1] = require('socket.io-client')(baseUrl);
  setTimeout(()=>{
    let socket_id1 = sockets[0].id;
    let socket_id2 = sockets[1].id;
    const url1 = `${baseUrl}/join?socket_id=${socket_id1}&playerName=player1`
    const url2 = `${baseUrl}/join?socket_id=${socket_id2}&playerName=player2`
    axios.get(url1).then(res1 => {
      res1.status.should.be.equal(200);
      res1.data.playerName.should.be.equal("player1");
      res1.data.symbol.should.be.equal("X");
      axios.get(url2).then(res2 => {
        res2.status.should.be.equal(200);
        res2.data.playerName.should.be.equal("player2");
        res2.data.symbol.should.be.equal("O");
      }).catch(err => done(err))
    }).catch(err => done(err));
    let bothDone = 0;
    sockets[0].on("opponentAvailable", (data) => {
      data.status.should.be.equal("ok");
      data.msg.should.be.equal("you have an opponent");
      data.data.isYourTurn.should.be.equal(true); // for player 1
      data.data.opponentName.should.be.equal("player2"); // for player 1
      bothDone++;
      if(bothDone === 2) done();
    });
    sockets[1].on("opponentAvailable", (data) => {
      data.status.should.be.equal("ok");
      data.msg.should.be.equal("you have an opponent");
      data.data.isYourTurn.should.be.equal(false); // for player 1
      data.data.opponentName.should.be.equal("player1"); // for player 1
      bothDone++;
      if(bothDone === 2) done();
    });
  }, 200); // wait for sockets to setup
},
testOnlyOnePlayerPlay = (done) => {
  sockets[2] = require('socket.io-client')(baseUrl);
  setTimeout(()=>{
    let socket_id = sockets[2].id;
    const url = `${baseUrl}/join?socket_id=${socket_id}&playerName=player3`
    axios.get(url).then(res1 => {
      res1.status.should.be.equal(200);
      res1.data.playerName.should.be.equal("player3");
      res1.data.symbol.should.be.equal("X");
    }).catch(err => done(err));
    sockets[2].emit("move", {"move_id": 0});
    sockets[2].once("move_done", (data) => {
      data.status.should.be.equal("error");
      data.msg.should.be.equal("player attempting to move without being in a game, join this player to a game with GET to /join");
      data.errorCode.should.be.equal(1);
      should(data.data).not.be.ok;
      done()
    });
  }, 200); // wait for sockets to setup
},
testJoinGamePlayer4 = (done) => {
  sockets[3] = require('socket.io-client')(baseUrl);
  setTimeout(()=>{
    let socket_id = sockets[3].id;
    const url = `${baseUrl}/join?socket_id=${socket_id}&playerName=player4`
    axios.get(url).then(res1 => {
      res1.status.should.be.equal(200);
      res1.data.playerName.should.be.equal("player4");
      res1.data.symbol.should.be.equal("O");
    }).catch(err => done(err));
    sockets[3].once("opponentAvailable", (data) => {
      data.status.should.be.equal("ok");
      data.msg.should.be.equal("you have an opponent");
      data.data.isYourTurn.should.be.equal(false); // for player 4
      data.data.opponentName.should.be.equal("player3"); // for player 4
      done();
    });
  }, 200); // wait for sockets to setup
}
testPlayer4OutOfTurn = (done) => {
  sockets[3].emit("move", {"move_id": 0});
  sockets[3].once("move_done", (data) => {
    data.status.should.be.equal("error");
    data.msg.should.be.equal("player attempting to play out of turn");
    data.errorCode.should.be.equal(5); // out of turn
    should(data.data).not.be.ok;
    done()
  });
},
testPlayer3Move0Sucess = (done) => {
  sockets[2].once("move_done", (data) => {
    data.status.should.be.equal("success");
    data.msg.should.be.equal("player moved to position 0");
    should(JSON.stringify(data.data.boardState)).be.equal('["X","","","","","","","",""]');
    should(data.data.gameWinner).not.be.ok;
    done()
  });
  sockets[2].emit("move", {"move_id": 0});
},
testPlayer4Move0Fail= (done) => {
  sockets[3].once("move_done", (data) => {
    data.status.should.be.equal("error");
    data.errorCode.should.be.equal(4); // already taken
    data.msg.should.be.equal("player attempting to move to a slot in the game that already has a symbol in it");
    should(data.data).not.be.ok;
    done()
  });
  sockets[3].emit("move", {"move_id": 0});
},
testPlayer4Move10Fail= (done) => {
  sockets[3].once("move_done", (data) => {
    data.status.should.be.equal("error");
    data.errorCode.should.be.equal(2); // invalid move id
    data.msg.should.be.equal("you did not provide a valid move id, you need to provide data that looks like {move_id: move_id}, where move_id is an interger that corresponds to an index in the board array");
    should(data.data).not.be.ok;
    done()
  });
  sockets[3].emit("move", {"move_id": 10});
}
;


describe("Start",()=>{
  before(startApp);
  it("start", (done)=>{done();});
});
describe("Join game tests", ()=> {
  it("player 1 and 2 both join successfully", testBothJoinSuccessfully);
  it("player 3 joins and no other player but attempts to play", testOnlyOnePlayerPlay);
  it("player 4 joins player 3 game", testJoinGamePlayer4);
});
describe("Play game tests", ()=>{
  it("player 4 attempts to play out of turn", testPlayer4OutOfTurn);
  it("player 3 moves to position 0 successfully", testPlayer3Move0Sucess);
  it("player 4 fails to move position 0", testPlayer4Move0Fail);
  it("player 4 fails to move position 10", testPlayer4Move10Fail);
});

describe("End",()=>{
  after(stopApp);
  it("end", (done)=>{done();});
});
