const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRouter');
const bookRouter = express.Router();

function router(nav) {
  const books = [];

  bookRouter.route('/')
    .get((req, res) => {
      const request = new sql.Request();
      request.query('select * from books').then(result => {
        result.recordset.forEach((r) =>{
          books.push({
            title: r.title,
            id: r.id,
            author: r.author
          })
        });
        
        res.render('bookListView', {
          nav,
          title: 'Library',
          books: result.recordset
        });
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const id = parseInt(req.params.id) - 1;
      res.render('bookView', {
        nav,
        title: 'Library',
        book: books[id]
      });
    });
  return bookRouter;
}

module.exports = router;
