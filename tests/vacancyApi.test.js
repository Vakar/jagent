const dbMock = require("./db.mock");
const app = require("../app");
const chai = require("chai");
const User = require("../models/user");
const Vacancy = require("../models/vacancy");
const bcrypt = require("bcrypt");
const session = require("supertest-session");

/* Config chai */
chai.should();

const HTTP_OK = 200;
const HTTP_FOUND = 302;
const API_PATH = "/api/rest/vacancies";

const credentials = {
  username: "user",
  password: "1234",
};

/* Factory method for User mongoose model */
const newUser = (username, pswdHash) => {
  return new User({
    username: username,
    password: pswdHash,
  });
};

/* Factory method for Vacancy mongoose model */
const newVacancy = (userId, name) => {
  return new Vacancy({
    userId: userId,
    name: name,
  });
};

/* Convert mongoose document to plain JS object */
const documentToObject = (doc) => {
  const json = JSON.stringify(doc.toObject());
  return JSON.parse(json);
};

/* Application user in database */
let user;
let appUser;

/*
 * Array of saved to database vacancy objects
 * that belong to the authorized users.
 */
let userCompanies;

/* Populate users database collection */
const populateUsers = async () => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const doc1 = await newUser("name", pswdHash).save();
  const doc2 = await newUser(credentials.username, pswdHash).save();
  user = documentToObject(doc1);
  appUser = documentToObject(doc2);
};

/* Populate vacancies database collection */
const populateCompanies = async () => {
  const vacancy1 = newVacancy(appUser._id, "vacancy1");
  const vacancy2 = newVacancy(appUser._id, "vacancy2");
  await newVacancy(user._id, "vacancy3").save();
  const vacancy1Doc = await vacancy1.save();
  const vacancy2Doc = await vacancy2.save();
  const vacancy1Obj = documentToObject(vacancy1Doc);
  const vacancy2Obj = documentToObject(vacancy2Doc);
  userCompanies = [vacancy1Obj, vacancy2Obj];
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

describe("COMPANY CONTROLLER TEST", () => {
  before(async () => {
    await dbMock.connect();
  });

  beforeEach(async () => {
    await populateUsers();
    await populateCompanies();
    await authorize();
  });

  afterEach(async () => {
    await dbMock.clear();
  });

  after(async () => {
    await dbMock.close();
  });

  it(`GET: ${API_PATH} | get vacancies belong to authorized user`, (done) => {
    authorizedSession
      .get(API_PATH)
      .expect((res) => {
        res.body.should.to.deep.equal(userCompanies);
      })
      .expect(HTTP_OK, done);
  });

  it(`GET: ${API_PATH} | get vacancy from database by id`, (done) => {
    authorizedSession
      .get(`${API_PATH}/${userCompanies[0]._id}`)
      .expect((res) => {
        res.body.should.to.eql(userCompanies[0]);
      })
      .expect(HTTP_OK, done);
  });

  it(`POST: ${API_PATH} | save vacancy to database`, async () => {
    const vacancyName = "newVacancy";
    await authorizedSession
      .post(API_PATH)
      .send({ userId: appUser._id, name: vacancyName })
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const docs = await Vacancy.find({
      name: vacancyName,
    });
    docs.length.should.to.equal(1);
    const vacancy = documentToObject(docs[0]);
    vacancy.should.to.include({ userId: appUser._id, name: vacancyName });
  });

  it(`POST: ${API_PATH} | return saved vacancy as json`, (done) => {
    const vacancyName = "newVacancy";
    authorizedSession
      .post(API_PATH)
      .send({ userId: appUser._id, name: vacancyName })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.should.to.include({ userId: appUser._id, name: vacancyName });
      })
      .expect(HTTP_OK, done);
  });

  it(`PUT: ${API_PATH} | update vacancy in database`, async () => {
    const vacancy = userCompanies[0];
    const newVacancyName = "new vacancy name";
    vacancy.name = newVacancyName;
    await authorizedSession
      .put(API_PATH)
      .send(vacancy)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const doc = await Vacancy.findById(vacancy._id);
    const updatedVacancy = documentToObject(doc);
    updatedVacancy.should.to.include(vacancy);
  });

  it(`PUT: ${API_PATH} | return updated vacancy as json`, (done) => {
    const vacancy = userCompanies[0];
    const newVacancyName = "new vacancy name";
    vacancy.name = newVacancyName;
    authorizedSession
      .put(API_PATH)
      .send(vacancy)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.should.to.include(vacancy);
      })
      .expect(HTTP_OK, done);
  });

  it(`DELETE: ${API_PATH} | delete vacancy by id from database`, async () => {
    const vacancyId = userCompanies[0]._id;
    await authorizedSession.delete(`${API_PATH}/${vacancyId}`).expect(HTTP_OK);
    const isVacancyExists = await Vacancy.exists({ _id: vacancyId });
    isVacancyExists.should.to.equal(false);
  });
});
