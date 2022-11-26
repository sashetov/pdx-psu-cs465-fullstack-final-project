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
  fs.appendFileSync('tests.log', msg);
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
      //{"status":"ok","msg":"you have an opponent","data":{"isYourTurn":true}}
      data.status.should.be.equal("ok");
      data.msg.should.be.equal("you have an opponent");
      data.data.isYourTurn.should.be.equal(true); // for player 1
      bothDone++;
      if(bothDone === 2) done();
    });
    sockets[1].on("opponentAvailable", (data) => {
      //{"status":"ok","msg":"you have an opponent","data":{"isYourTurn":false}}
      data.status.should.be.equal("ok");
      data.msg.should.be.equal("you have an opponent");
      data.data.isYourTurn.should.be.equal(false); // for player 1
      bothDone++;
      if(bothDone === 2) done();
    });
  }, 200); // wait for sockets to setup
};
describe("Start",()=>{
  before(startApp);
  it("start", (done)=>{done();});
});
describe("Join game tests", ()=> {
  it("player 1 and 2 both join successfully", testBothJoinSuccessfully);
  //it("player 3 joins and no other player but attempts to play", testOnlyOnePlayerPlay);
});
describe("End",()=>{
  after(stopApp);
  it("end", (done)=>{done();});
});
