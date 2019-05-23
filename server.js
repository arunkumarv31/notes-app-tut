const { User, Task } = require('./models');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    User.findAll({
        include: [Task] 
    }).then(users => {
        //console.log(users[0].Tasks )
        res.render('index', { users });
    });
});

app.post('/users', (req, res) => User.create(req.body).then(() => res.redirect('/')).catch(() => res.redirect('/')));

app.post('/task/:id', (req, res) =>
    Task.create({
        ...req.body,
        UserId: req.params.id
    }).then(() => res.redirect('/'))
);

app.get ('/deluser/:id', (req, res)=> {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect ('/')
  });
  
})

app.get ('/deltask/:id', (req, res)=> {
  Task.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect ('/')
  });
  
})

app.listen(5000, () => console.log('Listening on port 5000'));



/* models.User.create ({
    username: 'spiderman'
  }).then((user) => {
    user.createTask ({ title: 'first task for user spiderman' }).then(()=>console.log('Worked'));
}).catch( err => console.log (err) ); */

/* models.Task.create({
    title: 'first task for user spiderman',
    UserId: 3
  }).then( function() {
    models.Task.create({
        title: 'second task for user spiderman',
        UserId: 3
      }).then()
  }); */

/* models.User.destroy({
  where: {
    id: 3
  }
}).then(function() {
  console.log ( 'done' );
}); */