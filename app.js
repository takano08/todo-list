const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'list_app'
});

app.get('/', (req, res) => {
  res.render('todo.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      //console.log(results);
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

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  console.log('update!');
  console.log(req.params.id);
  console.log('req'+JSON.stringify(req.body));
  connection.query(
    'UPDATE items SET name = ? WHERE id = ?',
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );

});




//完了チェックボックスに変更があった場合にcallされます。
app.post('/done/:id', (req, res) => {
  console.log('done!');
  console.log(req.params.id);
  console.log('req'+JSON.stringify(req.body));

  //ここで引数で渡されたitemDoneの値を反転させています。未完了→完了　完了→未完了

  if(req.body.itemDone == 0){
    req.body.itemDone = 1;
  }else{
    req.body.itemDone = 0;
  }

  //SQLを発行し、doneの変更内容を更新しています。
  connection.query(
      'UPDATE items SET done = ? WHERE id = ?',
      [req.body.itemDone, req.params.id],
      (error, results) => {

        res.redirect('/index');
      }
  );

});


app.listen(3000);