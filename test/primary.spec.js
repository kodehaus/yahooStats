const { expect } = require("chai");
const path = require("path");

const fsPromise = require("fs").promises;
const axios = require("axios").default;

const Procmonrest = require("procmonrest");

const serverUrl = "http://localhost:5000";

describe("an end-to-end test", function () {
  const serverProcess = new Procmonrest({
    command: "npm start",
    waitFor: /listening on port \d{4}/i,
  });

  before(() => {
    return serverProcess.start();
  });

  after(() => {
    if (serverProcess.running) {
      return serverProcess.stop();
    }
  });

  describe("a server", function () {
    describe("after start", function () {
      it("respond to the default url", async function (done) {
        const actual = await (await axios.get(serverUrl)).status;
        const expected = 200;

        expect(actual).to.equal(expected);
        done();
      }).catch(done) ;
    });
  });
});
