const dbMock = require("./db.mock");
const app = require("../app");
const chai = require("chai");
const User = require("../models/user");
const Company = require("../models/company");
const bcrypt = require("bcrypt");
const session = require("supertest-session");

/* Config chai */
chai.should();

const HTTP_OK = 200;
const HTTP_FOUND = 302;
const API_PATH = "/api/rest/companies";

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

/* Factory method for Company mongoose model */
const newCompany = (userId, name) => {
  return new Company({
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
 * Array of saved to database company objects
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

/* Populate companies database collection */
const populateCompanies = async () => {
  const company1 = newCompany(appUser._id, "company1");
  const company2 = newCompany(appUser._id, "company2");
  await newCompany(user._id, "company3").save();
  const company1Doc = await company1.save();
  const company2Doc = await company2.save();
  const company1Obj = documentToObject(company1Doc);
  const company2Obj = documentToObject(company2Doc);
  userCompanies = [company1Obj, company2Obj];
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

  it(`GET: ${API_PATH} | get companies belong to authorized user`, (done) => {
    authorizedSession
      .get(API_PATH)
      .expect((res) => {
        res.body.should.to.deep.equal(userCompanies);
      })
      .expect(HTTP_OK, done);
  });

  it(`GET: ${API_PATH} | get company from database by id`, (done) => {
    authorizedSession
      .get(`${API_PATH}/${userCompanies[0]._id}`)
      .expect((res) => {
        res.body.should.to.eql(userCompanies[0]);
      })
      .expect(HTTP_OK, done);
  });

  it(`POST: ${API_PATH} | save company to database`, async () => {
    const companyName = "newCompany";
    await authorizedSession
      .post(API_PATH)
      .send({ userId: appUser._id, name: companyName })
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const docs = await Company.find({
      name: companyName,
    });
    docs.length.should.to.equal(1);
    const company = documentToObject(docs[0]);
    company.should.to.include({ userId: appUser._id, name: companyName });
  });

  it(`POST: ${API_PATH} | return saved company as json`, (done) => {
    const companyName = "newCompany";
    authorizedSession
      .post(API_PATH)
      .send({ userId: appUser._id, name: companyName })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.should.to.include({ userId: appUser._id, name: companyName });
      })
      .expect(HTTP_OK, done);
  });

  it(`PUT: ${API_PATH} | update company in database`, async () => {
    const company = userCompanies[0];
    const newCompanyName = "new company name";
    company.name = newCompanyName;
    await authorizedSession
      .put(API_PATH)
      .send(company)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const doc = await Company.findById(company._id);
    const updatedCompany = documentToObject(doc);
    updatedCompany.should.to.include(company);
  });

  it(`PUT: ${API_PATH} | return updated company as json`, (done) => {
    const company = userCompanies[0];
    const newCompanyName = "new company name";
    company.name = newCompanyName;
    authorizedSession
      .put(API_PATH)
      .send(company)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.should.to.include(company);
      })
      .expect(HTTP_OK, done);
  });

  it(`DELETE: ${API_PATH} | delete company by id from database`, async () => {
    const companyId = userCompanies[0]._id;
    await authorizedSession.delete(`${API_PATH}/${companyId}`).expect(HTTP_OK);
    const isCompanyExists = await Company.exists({ _id: companyId });
    isCompanyExists.should.to.equal(false);
  });
});
