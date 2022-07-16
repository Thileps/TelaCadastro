var express = require('express');
var router = express.Router();
var users = [];

router.post('/add-users', function (req, res, next) {
  users.unshift(req.body);
  res.render('partial/table', { users: fillUsers() });
});

router.post('/add-card', function (req, res, next) {
  users.unshift(req.body);
  res.render('partial/card', { user: users[0] });
});

router.get('/get-users', function (req, res, next) {
  res.render('partial/table', { users: fillUsers() });
});

router.get('/get-card', function (req, res, next) {
  console.log(req);
  let arrayUserIndex = req.query.userIndex - 1;
  if (users == null || users[arrayUserIndex] == null) {
    let user = {
      userName: "",
      userEmail: "",
      userBirthDate: "",
      userTelephone: ""
    }
    res.render('partial/card', { user: user });
  } else {
    res.render('partial/card', { user: users[arrayUserIndex] });
  }
});

router.get('/', function (req, res, next) {
  res.render('index');
});

function fillUsers(){
  let formatedUsers = [].concat(users);
    if (formatedUsers.length < 4) {
      for (let index = 0; index < 4; index++) {
        formatedUsers.push({
          userName: "",
          userEmail: "",
          userBirthDate: "",
          userTelephone: ""
        });
        if (formatedUsers.length > 3) break;
      }
  }
  formatedUsers = formatedUsers.splice(0, 4);
  return formatedUsers
};

module.exports = router;
