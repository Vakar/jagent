const { credentials } = require("./testConstants");
const app = require("../../app");
const session = require("supertest-session");
const { HTTP_FOUND } = require("../../constants/httpCodes");

/**
 * Create authorized session for test purpose.
 *
 * @return Authorized test session object.
 */
exports.authorize = async () => {
  try {
    const testSession = session(app);
    await testSession.post("/login").send(credentials).expect(HTTP_FOUND);
    return testSession;
  } catch (err) {
    throw new Error(err.message);
  }
};
