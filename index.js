import Usuario from './data/data.js'
import express from 'express';

const app = express();

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

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});