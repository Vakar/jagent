const { connect, populate, clear, close } = require("../utils/db.mock");
const chai = require("chai");
const bcrypt = require("bcrypt");
const { HTTP_OK } = require("../../constants/httpCodes");
const { credentials, apiRoot } = require("../utils/testConstants");
const { authorize } = require("../utils/authorizeSession");
const User = require("../../models/user");

/* Config chai */
chai.should();

/** User api path. */
const API_PATH = `${apiRoot}/user`;

/** Authorized session for api testing. */
let authorizedSession;

/** User for saving to database. */
const user = Object.assign({}, credentials);

/** Saved to database user. */
let savedUser;

/**
 * Populate users database collection with one user.
 * @param userObj User js object for saving in database.
 *
 * @return Saved user js object.
 */
const populateUser = async (userObj) => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const payload = { password: pswdHash };
  return await populate(userObj, User, payload);
};

describe("USER CONTROLLER TEST", () => {
  before(async () => {});

  beforeEach(async () => {
    await connect();
    savedUser = await populateUser(user);
    authorizedSession = await authorize();
  });

  afterEach(async () => {
    await clear();
    await close();
  });

  after(async () => {});

  it(`GET: ${API_PATH}/id | get authorized user id`, (done) => {
    authorizedSession
      .get("/api/rest/user/id")
      .expect((res) => {
        res.body.should.to.eql({ id: savedUser._id });
      })
      .expect(HTTP_OK, done);
  });
});
