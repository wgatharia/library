const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRouter');
const bookRouter = express.Router();

function router(nav) {
  const books = [];

  bookRouter.route('/')
    .get((req, res) => {
      async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');

        res.render('bookListView', {
          nav,
          title: 'Library',
          books: recordset
        });
      };
      query();
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request
          .input('id', sql.Int, id)
          .query('select * from books where id=@id');

        res.render('bookView', {
          nav,
          title: 'Library',
          book: recordset[0]
        });
      }());


    });
  return bookRouter;
}

module.exports = router;
