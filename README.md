# bsocial-test

run with nodemon index.js

sample registration: 
mutation { register(registerInput:{ username:"amoah9" password:"56465452" email:"amoah@gmail.com" }){ id email token username } }

//use new username and password to test 

sample login: 
mutation { login(username:"amoah9", password:"56465452"){ id email username token } }
