var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('ErabiltzaileakDB', ['erabiltzailea'])

let users = [];

db.erabiltzailea.find( function (err, userdocs) {
  if (err) {
    console.log(err)
  } else {
    users = userdocs
  }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
  res.json(users)
});

router.post("/new", (req, res) => {
  users.push(req.body);
  db.erabiltzailea.insert(req.body, function (err, user) {
    if(err) {
      console.log(err)
    } else {
      console.log(user)
      res.json(user);
    }
  })
});

router.delete("/delete/:id", (req, res) => {
  users = users.filter(user => user.id != req.params.id);

  // remove user from mongo
  db.erabiltzailea.remove({ id: parseInt(req.params.id)}, function (err, user) {
    if (err) {
      console.log(err)
    } else{
      console.log(user)
    }
  })
  res.json(users);
});

router.put("/update/:id", (req, res) => {
  let user = users.find(user => user.id == req.params.id);
  user.izena = req.body.izena;
  user.abizena = req.body.abizena;
  user.email = req.body.email;

  // update user in mongo
  db.erabiltzailea.update({ id: parseInt(req.params.id) },
    { $set: { izena: req.body.izena, abizena: req.body.abizena, email: req.body.email }},
    function (err, user) {
      if (err) {
        console.log(err)
      } else{
        console.log(user)
      }
    })
    res.json(users);
})

module.exports = router;
