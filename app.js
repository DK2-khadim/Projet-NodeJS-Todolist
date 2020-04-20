const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();

app.use(cookieSession({secret:'todotopsecret'}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    if(typeof(req.session.todolist) == 'undefined'){
        req.session.todolist = [];
    }
    next();
});

app.get('/todo',(req,res,next) => {
    console.log(req.session.todolist);
    res.render('todo.ejs',{todolist:req.session.todolist});
});
app.post('/todo/ajouter/',urlencodedParser, (req,res,next) => {
    if (req.body.todo != ''){
        console.log(req.body.todo);
        req.session.todolist.push(req.body.todo);
    }
    res.redirect('/todo');
});
app.get('/todo/supprimer/:id', (req,res,next) => {
    if (req.params.id != ''){
       req.session.todolist.splice(req.params.id,1);
    }
    res.redirect('/todo');
});

app.use((req,res,next) =>{
    res.redirect('/todo');
});

module.exports = app;