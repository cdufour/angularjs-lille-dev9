var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // for parsing application/json

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var clients = [
      {
        name:'Roberto',
        lastname:'Baggio',
        age:78,
        country:'Italie',
        images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']
      },
      {
        name:'hanz',
        lastname:'muller',
        age:32,
        country:'Allemagne',
        images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']
      },
      {name:'Giorgio paulo', lastname:'Chiellini', age:45, country:'Italie', images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']},
      {name:'Manuel', lastname:'Neur', age:8, country:'France', images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']},
      {name:'etienne', lastname:'marcel paul vincent', age:23, country:'France', images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']},
      {name:'David', lastname:'Beckham', age:65, country:'Italie', images:['deniro.jpg', 'baggio.jpg', 'beckham.jpg']}
    ];

var countries = ["Allemagne", "France", "Belgique", "Italie"];

app.get('/test', function(req, res) {
  res.send("merci");
});

app.get('/clients', function(req, res) {
  res.json(clients);
  //res.sendStatus(500);
});

app.get('/clients/:lastname', function(req, res) {
  var lastname = req.params.lastname;

  for (var i = 0; i < clients.length; i++) {
    if (clients[i].lastname === lastname) res.json(clients[i]);
  }
  res.send('ok');
});

app.get('/countries', function(req, res) {
  res.json(countries);
  //res.sendStatus(500);
});

app.post('/clients', function(req, res) {
  clients.push(req.body);
  res.sendStatus(200);
});

app.listen(4000, function() {
  console.log("Serveur écoute port 4000...");
});
