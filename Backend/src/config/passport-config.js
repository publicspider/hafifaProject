const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { doesUserExist } = require("../controllers/auth")

passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, done) => {
        let user = await doesUserExist(username);
        if (user === null) {
          return done(null, false);
        }
        done(null, user);
      } 
    )
  );

  passport.serializeUser((user, cb) => {
    console.log("hello");
    cb(null, { pernr: user.pernr });
  });
  
  passport.deserializeUser(async (serializedUser, done) => {
    
    console.log("hello2");
    return done(null, await doesUserExist(serializedUser.pernr));
});

  // 
  module.exports = passport;