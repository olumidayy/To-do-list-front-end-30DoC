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

const store = new KnexSessionStore({ useNullAsDefault: true });
app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    },
    store: store,
    useNullAsDefault: true
}));


app.set('view engine', 'ejs')
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    if (req.session.email) {
        res.redirect('/todo')
    } else {
        res.sendFile(path.join(__dirname + '/login.html'));
    }
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname + '/signup.html'));
})

app.post('/login_submit', (req, res) => {
    console.log('login', req.body)
    var { email, password } = req.body;
    sess = req.session;
    db('users')
        .where('email', '=', email)
        .then(user => {
            bcrypt.compare(password, user[0].password, function(err, result) {
                if (result) {
                    console.log(user)
                    sess.user = user[0];
                    sess.save()
                    res.redirect('/')
                } else {
                    res.render('signin')
                }
            });
        }).catch(err => {
            res.render('signin')
    })
})

app.post('/signup_submit', (req, res) => {
    var { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        db('tdusers')
            .insert({
                email: email,
                name: name,
                password: hash
            }).then(() => {
                req.session.email = email
                res.redirect('/');
            }
            )
    });
})

app.post('/save', (req, res) => {
    var tasks = req.body;
    // console.log(tasks);
    tasks.forEach(task => {
        db('tasks').where('id', '=', task.id).then(t => {
            if (t.length != 0) {
                db('tasks').where({ id: t[0].id, user : req.session.email }).update({
                    done: task.done ? 1 : 0,
                    trash: task.trash ? 1 : 0
                }).catch(e => console.log)
            } else {
                db('tasks')
                    .insert({
                        id: task.id,
                        user: req.session.email,
                        name: task.name,
                        done: task.done ? 1 : 0,
                        trash: task.trash ? 1 : 0
                    }).catch(e => console.log)
            }
        }).catch(e => {
            console.log('error,', e)
        })
    });
})

app.get('/data', async(req, res) => {
    var tasks;
    await db('tasks').where({user : req.session.email}).then(data =>
        tasks = data
    );
    // console.log('tasks', tasks)
    res.json(tasks);
})

app.get('/todo', async(req, res) => {
    if (req.session.email) {
        res.sendFile(path.join(__dirname + '/index.html'));
    } else {
        res.sendFile(path.join(__dirname + '/login.html'));
    }
})

app.get('/clear', (req, res) => {
    var tasks;
    db.del('*').from('tasks').catch(e => console.log)
    // console.log('tasks', tasks)
    res.redirect('/todo')
})

app.listen(process.env.PORT || 8000)