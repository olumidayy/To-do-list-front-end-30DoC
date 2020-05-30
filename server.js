const express = require('express')
// const fetch = require('node-fetch');
const knex = require('knex');
const path = require('path')
const session = require('express-session');
const KnexSessionStore = require("connect-session-knex")(session);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express()

//mysql://b4ab11989ab7cb:800704ea@us-cdbr-east-06.cleardb.net/heroku_cdd4f36eba0bfdd?reconnect=true
// app.use(responseTime());


var sess;

const db = knex({
    client: 'mysql',
    connection: {
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b4ab11989ab7cb',
        password: '800704ea',
        database: 'heroku_cdd4f36eba0bfdd'
    },
    useNullAsDefault: true
});

const store = new KnexSessionStore({useNullAsDefault: true});
app.use(session({ 
    secret: 'ssshhhhh', 
    saveUninitialized: true, 
    resave: true,
    cookie : {
        maxAge: 1000* 60 * 60 *24 * 365
    },
    store: store,
    useNullAsDefault: true
 }));


app.set('view engine', 'ejs')
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname + '/login.html'));
})

app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname + '/signup.html'));
})

app.post('/login_submit', (req, res) => {
    console.log('login', req.body)
})

app.post('/signup_submit', (req, res) => {
    console.log('signup', req.body)
})

app.post('/save', (req, res)=>{
    console.log('save', req.body)
})

app.get('/data', (req, res)=>{
    res.render('index');
})

app.listen(process.env.PORT || 8000)