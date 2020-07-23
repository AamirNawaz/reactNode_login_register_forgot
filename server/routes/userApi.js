var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { route } = require(".");
const SECRETKEY = "Qwerty@2345";

const nodemailer = require("nodemailer");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
//password encryption
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

//importing User Model
const User = require("../models/User");

//TokenVerification
const varifyTheToken = (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, SECRETKEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      }
      req.userData = data;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};

//login function
router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        res.json({
          status: 201,
          message: "User Email not found in our Record!",
        });
      }

      const hash = user.dataValues.password;
      bcrypt.compare(password, hash, function (err, response) {
        if (response === true) {
          const userData = {
            email,
          };

          jwt.sign(userData, SECRETKEY, { expiresIn: "1h" }, (err, token) => {
            if (err) {
              res.json({
                status: 201,
                message: "Faild to Generate Token",
              });
            }
            res.json({
              token,
            });
          });
        } else {
          res.json({
            status: 201,
            message: "You have entered wrong password!",
          });
        }
      });
    })

    .catch((err) => {
      res.json({
        status: 201,
        message: err.message,
      });
    });

  // if (email === "aamir@gmail.com" && password === "aamir") {
  //   const userData = {
  //     email,
  //   };

  //   jwt.sign(userData, SECRETKEY, (err, token) => {
  //     if (err) {
  //       res.sendStatus(403);
  //     }
  //     res.json({
  //       token,
  //     });
  //   });
  // } else {
  //   res.sendStatus(403);
  // }
});

//User signup
router.post("/signup", async function (req, res) {
  const reqBody = req.body;

  if (req.body.data.password === req.body.data.confirmPassword) {
    var hashPassword = bcrypt.hashSync(req.body.data.password, salt);
  } else {
    res.status(201).send({
      message: "Password Not match with Confirm password!",
    });
  }

  const user = await User.create({
    fullname: reqBody.data.fullname,
    email: reqBody.data.email,
    password: hashPassword,
  })
    .then((user) => {
      if (user) {
        res.status(200).send({
          message: "User Registered succesffuly!",
        });
      }
    })
    .catch((err) => {
      res.status(201).send({
        message: "User Already Exist against this email!",
      });
    });
});

//forgot password
router.post("/forgot", async function (req, res) {
  const reqBody = req.body.data;
  var newToken = {};
  let email = reqBody.email;
  const userData = {
    email,
  };

  const result = await User.findOne({
    where: {
      email: email,
    },
  });

  if (result === null) {
    return res.json({
      status: 201,
      message: "User Not found against this email!",
    });
  }

  jwt.sign(userData, SECRETKEY, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      res.json({
        status: 201,
        message: "Faild to Generate Token",
      });
    }

    //mail auth
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "techbees73@gmail.com",
        pass: '4tgy4yypq""',
      },
    });

    var htmlEmail = "<!doctype html>";
    htmlEmail += '<html lang="en-US">';
    htmlEmail +=
      '<head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" />';
    htmlEmail += "<title>Reset Password Email Template</title>";
    htmlEmail +=
      '<meta name="description" content="Reset Password Email Template.">';
    htmlEmail +=
      '<style type="text/css">a:hover {text-decoration: underline !important;}</style>';
    htmlEmail += "</head>";

    htmlEmail +=
      '<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">';

    htmlEmail +=
      '<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open Sans", sans-serif;">';
    htmlEmail +=
      '<tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"align="center" cellpadding="0" cellspacing="0"><tr><td style="height:80px;">&nbsp;</td>';
    htmlEmail +=
      ' </tr><tr> <td style="text-align:center;"> <a href="http://localhost:3000" title="logo" target="_blank"><!-- <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo"> -->';
    htmlEmail +=
      '<h1>Node js Reset password</h1> </a></td></tr><tr><td style="height:20px;">&nbsp;</td></tr><tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"                               style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">';
    htmlEmail +=
      '<tr><td style="height:40px;">&nbsp;</td></tr><tr><td style="padding:0 35px;"><h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:"Rubik",sans-serif;">You have equested to reset your password</h1>';
    htmlEmail +=
      '<span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">   We cannot simply send you your old password. A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions.';
    htmlEmail +=
      '</p><a href="http://localhost:3000/reset/token=' +
      token +
      '" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset Password</a></td></tr><tr>';
    htmlEmail +=
      ' <td style="height:40px;">&nbsp;</td></tr></table></td><tr><td style="height:20px;">&nbsp;</td></tr><tr><td style="text-align:center;">';
    htmlEmail +=
      '<p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>thequicksol.com</strong></p>';
    htmlEmail +=
      '</td></tr><tr><td style="height:80px;">&nbsp;</td>/tr></table></td></tr></table><!--/100% body table--></body>';

    //mail option
    var mailOptions = {
      from: "techbees73@gmail.com",
      to: email,
      subject: "Change password from Node.js",
      html: htmlEmail,
    };

    //send mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(200).send({
          message: "Email Sending Faild! Check your email",
        });
      } else {
        console.log("Email sent" + info.response);
        res.status(200).send({
          message: "Password Recovery Email sent!",
        });
      }
    });

    sequelize.query(
      `UPDATE users SET reset_password_token = '${token}' , reset_password_expires='${
        Date.now() + 86400000
      }' WHERE email ='${email}'`
    );
    res.json({
      resetStatus: true,
      status: 200,
      message: "Reset password link send to your email!",
    });
  });
});

router.post("/validateResetToken", async function (req, res, next) {
  let userToken = req.body.token.split("token=");
  let token = userToken[1];

  const result = await User.findOne({
    where: {
      reset_password_token: token,
      reset_password_expires: { [Op.gt]: Date.now() },
    },
  });

  if (result === null) {
    return res.json({
      status: 201,
      message: "Token Expired Please! please reset your password again.",
    });
  }
  return res.json({
    resetStatus: true,
    status: 200,
    message: "Token Matched succesfully!",
  });
});

//change password
router.post("/changePassword", async function (req, res, next) {
  let userToken = req.body.data.token.split("token=");
  let token = userToken[1];

  var hashPassword = bcrypt.hashSync(req.body.data.newPassword, salt);

  const result = await User.update(
    { password: hashPassword },
    {
      where: {
        reset_password_token: token,
        reset_password_expires: { [Op.gt]: Date.now() },
      },
    }
  )
    .then((result) => {
      // console.log(result);
      return res.json({
        resetStatus: true,
        status: 200,
        message: "Password changed succesfully!",
      });
    })
    .catch((error) => {
      // console.log(error);
      return res.json({
        status: 201,
        message: "Token Expired Please! please reset your password again.",
      });
    });

  if (result === null) {
  }
});

//delete user
router.post("/delete", varifyTheToken, (req, res) => {
  console.log("delete user", req.userData);
  res.send("User Deleted");
});

module.exports = router;
