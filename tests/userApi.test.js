const dbMock = require("./utils/db.mock");
const app = require("../app");
const chai = require("chai");
const bcrypt = require("bcrypt");
const session = require("supertest-session");
const { HTTP_OK, HTTP_FOUND } = require("../constants/httpCodes");
const { credentials, apiRoot } = require("./utils/testConstants");
const { newUser } = require("../models/modelFactory");
const { docToObj } = require("./utils/mongooseUtil");

/* Config chai */
chai.should();

const API_PATH = `${apiRoot}/user`;

/* Authorized user */
let user;

/* Populate users database collection */
const populateUsers = async () => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const doc = await newUser(credentials.username, pswdHash).save();
  user = docToObj(doc);
};

/* Authorized session for api testing */
let authorizedSession;

/* Authorize in system */
const authorize = async () => {
  try {
    const testSession = session(app);
    await testSession.post("/login").send(credentials).expect(HTTP_FOUND);
    authorizedSession = testSession;
  } catch (err) {
    throw new Error(err.message);
  }
};

describe("USER CONTROLLER TEST", () => {
  before(async () => {});

  beforeEach(async () => {
    await dbMock.connect();
    await populateUsers();
    await authorize();
  });

  afterEach(async () => {
    await dbMock.clear();
    await dbMock.close();
  });

  after(async () => {});

  it(`GET: ${API_PATH}/id | get authorized user id`, (done) => {
    authorizedSession
      .get("/api/rest/user/id")
      .expect((res) => {
        res.body.should.to.eql({ id: user._id });
      })
      .expect(HTTP_OK, done);
  });
});
