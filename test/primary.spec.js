const { expect } = require("chai");
const path = require("path");

const fsPromise = require("fs").promises;
const axios = require("axios").default;

const Procmonrest = require("procmonrest");

const serverUrl = "http://localhost:3000";

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

  describe("a server", function () {
    describe("after start", function () {
      it("responds to the default url", async function () {
        const actual =  (await axios.get(serverUrl)).status;
        const expected = 200;

        expect(actual).to.equal(expected);
      });
    });
  });
});
