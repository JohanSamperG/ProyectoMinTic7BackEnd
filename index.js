import Usuario from './data/data.js'
import express from 'express';
var port = process.env.PORT || 3000;

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.get('/api/registrar', function(req, res) {
    try {
        const email = req.query.email;
        const password = req.query.password;
        new Usuario(email, password).Register().then(response => {
            res.send(response);
        });
    }catch(err) {
        console.error(err);
    }
});

app.get('/api/login', function(req, res) {
    try {
        const email = req.query.email;
        const password = req.query.password;
        new Usuario(email, password).Login().then(response => {
            res.send(response);
        });
    }catch(err) {
        console.error(err);
    }
});

app.get('/api/logout', function(req,res) {
    try{
        new Usuario().Logout().then(response => {
            res.send(response);
        });        
    }catch(err){
        console.error(err);
    }
});

app.get('/api/user', function(req,res) {
    try{
        res.send(new Usuario().GetUsuario());
    }catch(err){
        console.error(err);
    }
});

app.listen(port, function () {
    console.log('App listening on port '+port);
});