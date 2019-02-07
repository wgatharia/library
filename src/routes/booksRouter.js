const express = require('express');
const bookRouter = express.Router();
const app = express();

const books = [{
    title: 'Testing Python',
    author: 'William Gatharia'
}];
bookRouter.route('/')
    .get((req, res) => {
        res.render('books', {
            nav: [{ link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' }],
            title: 'Library',
            books
        });
    });

bookRouter.route('/single')
    .get((req, res) => { res.send('single book'); });


module.exports = bookRouter;