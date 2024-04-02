
const User = require("../models/users.js");

exports.handleLogin = (req, res) => {
    res.send(
      JSON.stringify({
        message: "success",
        pernr: req.user.pernr,
        gdud: req.user.gdud,
        isManager: req.user.isManager,
      })
    );
};


 exports.handleLogout = (req, res, next) => {
    let message;
    req.logout(function (err) {
      if (err) {
        return next(err);
       
      }
      message = "Logged Out";
    });
    req.session.destroy(function (err) {
      if (!err) {
        res
          .status(200)
          // .clearCookie("connect.sid", { path: "/" })
          .json({ status: "success" });
        return;
      } else {
        res.send({ message });
      }
    });
};
  
  exports.isLoggedIn = (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      res.send(
        JSON.stringify({
          message: "authenticated",
          gdud: req.user.gdud,
          isManager: req.user.isManager,
          pernr: req.user.pernr,
        })
      );
    } else {
      res.send(JSON.stringify({ message: "not authenticated" }));
    }
};

exports.isManager = (req) => {
    return req.user && req.user.isManager == 1;
};

exports.doesUserExist = async (pernr) => {
    try {
      const user = await User.findOne({ pernr: pernr });
      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
};