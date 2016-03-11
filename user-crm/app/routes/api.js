var User = require('../models/user'),
  jwt = require('jsonwebtoken'),
  config = require('../../config.js');

var superSecret = config.secret;

module.exports = function (app, express) {
  var apiRouter = express.Router();

  //Authenticate user. /api/authenticate
  apiRouter.post('/authenticate', function (req, res) {
    console.log(req.body.username);

    //Find and authenticate user
    User.findOne({
        username: req.body.username
      })
      .select('password')
      .exec(functio(err, user) {
        if (err) {
          throw err;
        }

        //No username found
        if (!user) {
          res.json({
            success: false,
            message: "Authentication failed. User not found."
          });
        } else if (user) {
          //Validate password
          var valiPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.json({
              success: false,
              message: "Authentication failed. Incorrest password."
            });
          } else {
            //User is found and password is correct
            var token = jwt.sign(user, superSecret, {
              expiresInMinutes: 1440 //24 Hours
            });

            res.json({
              success: true,
              message: "Token created",
              token: token
            });
          }
        }
      });
  });

  apiRouter.use(function (req, res, next) {
    console.log("Someone just came to the app");

    //Check for presence of token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //Decode token
    if (token) {

      jwy.verify(token, superSecret, function (err decoded) {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          //No token
          return res.status(403).send({
            success: false,
            message: 'No token provided.'
          });
        }
      });

    }

  });

  apiRouter.get('/', function (req, res) {
    res.json({
      message: "Root"
    });
  });

}