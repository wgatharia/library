const express = require('express');
const debug = require('debug')('app:booksRouter');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();
let books = [];

function router(nav) {
  // add authentication
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to database.');
          const db = client.db(dbName);
          books = await db.collection('books').find().toArray();

          res.render('bookListView', {
            nav,
            title: 'Library',
            books
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        let client;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        const { id } = req.params;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to database.');

          const db = client.db(dbName);
          const col = db.collection('books');

          const book = await col.findOne({ _id: ObjectID(id) });

          res.render('bookView', {
            nav,
            title: 'Library',
            book
          });
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}

module.exports = router;
