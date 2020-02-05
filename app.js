
const express = require('express');
const app = express();
const http = require('http')
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport'); 
const fs = require('fs');
const config = require('./config/config.js');
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

mongoose.connect (config.db);
const db = mongoose.connection;

db.on('connected',  () => {
  console.log("Conneted to db..");
});
app.use(passport.initialize());  
app.use(passport.session()); 
app.use(session({
  name :'myCustomCookie',
  secret: 'myAppSecret', 
  resave: true,
  httpOnly : true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

require('./config/google-auth')(passport);
require('./config/facebook-auth')(passport);

fs.readdirSync('./app/models').forEach(function(file){
	
	if(file.indexOf('.js'))
		
		require('./app/models/'+file);

});


fs.readdirSync('./app/controllers').forEach(function(file){
	if(file.indexOf('.js')){
		
		const route = require('./app/controllers/'+file);
	
		route.controller(app);

	}

});
app.use(function(req, res) {
    res.sendFile('index.html', { root: __dirname + "/public" });
});

 
    app.route('*')

          .get((req,res,next)=>{

                  res.statusCode = 404;
                  next("Path not found");

          })

        .post((req,res,next)=>{

                  res.statusCode = 404;
                  next("Path not found");
            });


 app.use((err,req,res,next) =>{

      console.log("this is error handling middleware");

      if(res.statusCode==404) {
        const myResponse = responseGenerator.generate(true,"Page Not Found,Go Back To HomePage",404,null);
        res.render('error', {
            message: myResponse.message,
            status: myResponse.status
        });
      }

      else {
        console.log(err);
        res.send(err);
      }

    });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });	

const server = http.createServer(app);
server.listen(app.get('port'),(req,res)=>{
	console.log('App listening to port'+app.get('port'));
});