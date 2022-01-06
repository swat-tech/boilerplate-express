//Create and start an Express server
var express = require('express');
var app = express();

//Include the body-parser module
var bodyParser = require('body-parser');
//When extended=false it uses the classic encoding querystring library
app.use(bodyParser.urlencoded({ extended: false }));
//Mount the middleware
app.use(bodyParser.json());

require('dotenv').config();

//Absolute path of the file using Node global variable --dirname
absolutePath = __dirname + '/views/index.html';

//Use express.static to serve static assets like css in the response
app.use('/public',express.static(__dirname + '/public'));

//Root level request logger middleware
app.use(function middleware(req, res, next) {
    // Do something
    cconsole.log(req.method+" "+req.path+" "+"-"+" "+req.ip);
    // Call the next function in line:
    next();
  });

//Middleware chaining
app.get('/now',(req, res, next)=>{
    req.time = new Date().toString();
    next();
}, (req, res)=>{
    res.json({"time":req.time});
});

//Getting route parameter input from client/url
app.get('/:word/echo',(req,res)=>{
    res.json({"echo":req.params.word}); 
});

//Getting query parameter input from client/url
app.get('/name',(req,res)=>{
    res.json({"name":req.query.first +" "+req.query.last}); 
});

//Getting data from POST request
app.post('/name',(req,res)=>{
    res.json({"name":req.body.first +" "+req.body.last}); 
});

//Send file in response
app.get('/',function(req, res){
  res.sendFile(absolutePath);
});

//Serve JSON object as a response on a specific route
//URL: https://boilerplate-express-1.swathiraman1.repl.co/json
app.get('/json', function(req,res){
    
    //Check the .env file for the message style
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message":"HELLO JSON"});
    }else{
        res.json({"message":"Hello json"});
    }
    
})

//Use app.get() to server the string "Hello Express" to GET requests matching the '/' root path
//app.get('/',function(rq,res){
//res.send("Hello Express");
//})

//Display Hello World on the console
//console.log('Hello World');




































 module.exports = app;
