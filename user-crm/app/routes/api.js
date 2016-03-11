var User = require('../models/user'),
  jwt = require('jsonwebtoken'),
  config = require('../../config.js');

var superSecret = config.secret;

module.exports = function (app, express) {
  var apiRouter = express.Router();

  //Authenticate user
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


}