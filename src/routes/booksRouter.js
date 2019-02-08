const express = require('express');
const bookRouter = express.Router();

const books = [{
    title: 'Testing Python',
    author: 'William Gatharia'
}];
bookRouter.route('/')
    .get((req, res) => {
        res.render('bookListView', {
            nav: [{ link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' }],
            title: 'Library',
            books
        });
    });

bookRouter.route('/:id')
    .get((req, res) => { 
        const id  = req.param.id;
        console.log(id);
        res.render('bookView', {
            nav: [{ link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' }],
            title: 'Library',
            book: id
        });
    });


module.exports = bookRouter;