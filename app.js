const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'list_app'
});

app.get('/', (req, res) => {
  res.render('todo.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      console.log(results);
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      console.log("insertResults"+results);
      console.log("insertError"+error);
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});



app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE items SET name = ? WHERE id = ?',
    [req.body.itemName, req.params.id],
    (error, results) => {
      console.log(error);
      res.redirect('/index');
    }
  );
});




app.post('/done/:id', (req, res) => {


  console.log('done!');
  console.log(req.params.id);
  console.log('req'+JSON.stringify(req.body));

  if(req.body.itemDone === "0"){
    req.body.itemDone = 1;
  }else{
    req.body.itemDone = 0;
  }


  connection.query(
    'UPDATE items SET done = ? WHERE id = ?',
    [req.body.itemDone, req.params.id],
    (error, results) => {
      console.log("doneResults"+error);
      console.log("doneError"+error);
      res.redirect('/index');
    }
  );
});


app.post('/important/:id', (req, res) => {


  

  if(req.body.itemImportant === "0"){
    req.body.itemImportant = 1;
  }else{
    req.body.itemImportant = 0;
  }


  connection.query(
    'UPDATE items SET important = ? WHERE id = ?',
    [req.body.itemImportant, req.params.id],
    (error, results) => {
      console.log("importantResults"+error);
      console.log("importantError"+error);
      res.redirect('/index');
    }
  );
});



app.listen(3000);