const express = require('express');
const app = express();
const router = express.Router();
const userData = require('./user.json')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
// http://localhost:8081/home
router.get('/home', (req,res) => {
  res.send('<h1>Welcome to ExpressJs Tutorial</h1>');
});

/*
- Return all details from user.json file to client as JSON format
*/
// http://localhost:8081/profile
router.get('/profile', (req,res) => {
  res.send(JSON.stringify(userData));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
//http://localhost:8081/login/?username=bret&password=bret@123
router.get('/login', (req,res) => {
  let userN = req.query.username;
  let passW = req.query.password;

  if (userN == userData.username && passW == userData.password) {
    res.send(`<h1>status: true,<br> message: "User Is valid"</h1>`);
  }
  if (userN != userData.username) {
    res.send('<h1>status: false,<br> message: "User Name is invalid"</h1>');
  }
  if (passW != userData.password) {
    res.send("<h1>status: false,<br> message: Password is invalid</h1>");
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
// http://localhost:8081/logout/:elijah
router.get('/logout/:username', (req,res) => {
  userN = req.params.username;
  res.send(`<h1><b>${userN} successfully logout.</b></h1>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));