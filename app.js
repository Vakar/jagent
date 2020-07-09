const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const flash = require("connect-flash");
const logger = require("morgan");
const mongoose = require("mongoose");
const nocache = require("nocache");
const helmet = require("helmet");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");

const publicRouter = require("./routes/public");
const restApi = require("./routes/restApi");

const Users = require("./models/user");

const loginController = require("./controllers/loginController");

const LocalStrategy = require("passport-local").Strategy;

/* VIEW ENGINE */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/* EXPRESS SETUP */
app.use(flash());
app.use(nocache());
app.use(logger("dev"));
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

/* MONGOOSE */
const MONGODB_URL = process.env.MONGO_URI;
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/* PASSPORT */
passport.use(
  new LocalStrategy(function (username, password, done) {
    Users.findOne({ username: username }, async function (err, user) {
      try {
        if (err) {
          return done(err);
        } else if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (e) {
        done(e);
      }
    });
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

/* SECURITY ZONE */
// GET show login page
app.get("/login", function (req, res) {
  res.render("login", {
    message: req.flash("error"),
  });
});

// POST handle login action
app.post(
  "/login",
  loginController.validateLogin(),
  loginController.filterValidationLoginErrors,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// GET handle logout action
app.get("/logout", function (req, res) {
  res.clearCookie("connect.sid", { path: "/" });
  req.logout();
  res.redirect("/");
});

/* PUBLIC ROUTES */
app.use("/", publicRouter);

// REJECT UNAUTHORIZED USERS and redirect them to /login
app.use(require("connect-ensure-login").ensureLoggedIn());

/* SECURE STATIC FOLDER FOR REACT APP*/
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("build"));

/* SECURE ROUTES */
app.use("/api/rest", restApi);

/* ERROR HANDLING */
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Server Error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
