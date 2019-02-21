const express = require('express');
const debug = require('debug')('app:adminRouter');

const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

const books = [{
  title: 'War and Peace',
  author: 'Lev Nikolayevich Tolstoy'
},
{
  title: 'Les Misérables',
  author: 'Victor Hugo'
},
{
  title: 'The Time Machine',
  author: 'H. G. Wells'
},
{
  title: 'A Journey into the Center of the Earth',
  author: 'Jules Verne'
}];


function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to database.');
          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}


module.exports = router;
