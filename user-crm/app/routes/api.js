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
      .exec(function (err, user) {
        if (err) {
          throw err;
        }

        console.log("here");

        //No username found
        if (!user) {
          res.json({
            success: false,
            message: "Authentication failed. User not found."
          });
        } else if (user) {
          //Validate password
          var validPassword = user.comparePassword(req.body.password);
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
    console.log('Somebody just came to our app!');

    //Check for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {

      //Verify token
      jwt.verify(token, superSecret, function (err, decoded) {

        if (err) {
          res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.decoded = decoded;

          next();
        }
      });

    } else {

      //If there is no token
      res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }
  });

  apiRouter.get('/', function (req, res) {
    res.json({
      message: "Root"
    });
  });


  //User routes
  apiRouter.route('/users')
    //Create user using POST at localhost:8080/api/users
    .post(function (req, res) {
      var user = new User();
      user.name = req.body.name;
      user.username = req.body.username;
      user.password = req.body.password;

      user.save(function (err) {
        if (err) {
          //Duplicate entry
          if (err.code == 11000) {
            return res.json({
              success: false,
              message: "A user with that username already exists."
            });
          } else {
            return res.send(err);
          }
        }

        res.json({
          message: "User created."
        });

      });
    })

  //Get all users
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err) {
        res.send(err);
      }

      res.json(users);
    });
  });

  //Get single user
  apiRouter.route('/users/:user_id')
    .get(function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) {
          res.send(err)
        }

        res.json(user);
      });
    })

  //Update user
  .put(function (req, res) {
    User.findById(req.params.user_ud, function (err, user) {
      if (err) {
        res.send(err);
      }

      if (req.body.name) {
        user.name = req.body.name;
      }

      if (req.body.username) {
        user.username = req.body.username;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      user.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.json({
          message: "User updated"
        });
      });

    });

  })

  //Delete user
  .delete(function (req, res) {
    User.remove({
      _id: req.params.user_id
    }, function (err, user) {
      if (err) {
        return res.send(err);
      }

      res.json({
        message: 'Successfully deleted'
      });
    });
  })

  return apiRouter;


};
