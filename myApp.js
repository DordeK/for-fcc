var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');
require('dotenv').config();
let bodyParser= require('body-parser')

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.use(function(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
})

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

app.use(bodyParser.urlencoded({extended: false}))

/** 1) Meet the node console. */
bGround.log("Hello world")
console.log("Hello world")

/** 2) A first working Express Server */


/** 3) Serve an HTML file */
app.get('/', function(req,res){
  res.sendFile(__dirname+'/views/index.html')
})



/** 4) Serve static assets  */
app.use(express.static(__dirname+"/public"));
app.use('/public', express.static(__dirname+'/public'))

/** 5) serve JSON on a specific route */
// app.get('/json', function(req,res){
//     res.json({'message':"Hello json"})
// })

/** 6) Use the .env file to configure the app */
app.get('/json', function(req,res){
  var jsonResponse ={"message":"Hello world"}
  if(process.env.MESSAGE_STYLE === 'uppercase'){
    jsonResponse.message = jsonResponse.message.toUpperCase()
  }
  res.json(jsonResponse)

})



/** 8) Chaining middleware. A Time server */
function getTime(){
  return new Date().toString();
}

app.get("/now", function(req, res, next){
  req.time = getTime();
  next();
}, function(req, res){
  res.json({ time: req.time });
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res){
  res.json({ echo: req.params.word })
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name',function(req, res) {
    res.json({name:req.query.first+" "+req.query.last})
})



/** 12) Get data form POST  */

app.post('/name', function(req, res) {
  res.json({name:req.body.first+ " " + req.body.last})
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
