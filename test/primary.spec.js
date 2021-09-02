const { expect } = require("chai");
const path = require("path");
const serverConfig = require('../config');

const fsPromise = require("fs").promises;
const axios = require("axios").default;

const Procmonrest = require("procmonrest");

const serverUrl = serverConfig.hostUrl + ":" +serverConfig.port ;


describe("server config", function() {
  it("should have valid port number", async function () {
    //Given

    //When
    const actual = parseInt(serverConfig.port, 10);

    // Then
    expect(actual).to.be.a('number');
  
  });
  it("should have a valid host name", async function () {
    //Given

    //When
    const actual = serverConfig.hostUrl;

    // Then
    expect(actual.startsWith("http://")).to.be.true;
  
  });
});

describe("an end-to-end test", function () {
  const serverProcess = new Procmonrest({
    command: "npm start",
    waitFor: /listening on port \d{4}/i,
  });

  before(() => {
    return serverProcess.start();
  });

  after(() => {
    if (serverProcess.isRunning) {
      return serverProcess.stop();
    }
  });

  describe("Yahoo player search", function () {
    it("default url responds", async function () {
      //given 
      const actual = (await axios.get(serverUrl)).status;

      //when 
      const expected = 200;
      //then
      expect(actual).to.equal(expected);
    });
  });
});
