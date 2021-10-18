const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');

const server = express();
const port = 2030;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Dirt!12345',
  database: 'crud'
});

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.urlencoded({ extended: false }));

server.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM movie_reviews;';
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

server.post('/api/insert', (req, res) => {
  const { movieName } = req.body;
  const { movieReview } = req.body;

  const sqlInsert = 'INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)';

  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log('err', result);
  });
});

server.delete('/api/delete/:movieName', (req, res) => {
  const { movieName } = req.params;

  const sqlDelete = 'DELETE FROM movie_reviews WHERE movieName = ?';

  db.query(sqlDelete, movieName, (err, result) => {
    if (err) {
      console.log('err', err);
    }
  });
});

server.put('/api/update', (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sqlUpdate = 'UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?';

  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) {
      console.log('err', err);
    }
  });
});

server.listen(port, () => debug(`Server is running in ${chalk.yellow(`localhost:${port}`)}`));
