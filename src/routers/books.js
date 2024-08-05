const express = require('express')
const router = express.Router()
const db = require("../../db");

router.post('/', async (req, res) => {
    const { title, type, author, topic, publication_date, pages } = req.body;
    const result = await db.query(
        "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, type, author, topic, publication_date, pages]
    );


    res.status(201).json({ book: result.rows[0] });

})

router.get('/', async (req, res) => {

    let query = `SELECT * FROM books`;
    let books;

    if (req.query.id) {
        query += ` WHERE id = $1`;
        books = await db.query(query, [req.query.id]);
    } else {
        books = await db.query(query);
    }

    res.status(200).json({ books: books.rows })
})

router.get('/:id', async (req, res) => {

    const result = await db.query(
        "SELECT * FROM books WHERE id = $1",
        [req.params.id]
    );

    res.status(200).json({ book: result.rows[0] })

})
router.put('/:id', async (req, res) => {

    const { title, type, author, topic, publication_date, pages } = req.body;
    const result = await db.query(
        "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
        [req.params.id, title, type, author, topic, publication_date, pages]
    );
    res.status(200).json({ book: result.rows[0] });

})
router.delete('/:id', async (req, res) => {

    const result = await db.query(
        "DELETE FROM books WHERE id = $1 RETURNING *",
        [req.params.id]
    );

    res.status(200).json({ book: result.rows[0] })

})





const createBook = async (newBook) => {
    const { title, type, author, topic, publication_date, pages } = newBook;
    const result = await db.query(
        "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, type, author, topic, publication_date, pages]
    );
    return result.rows[0];
};

const getBookById = async (id) => {
    const result = await db.query(
        "SELECT * FROM books WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

const updateBook = async (id, newBook) => {
    const { title, type, author, topic, publication_date, pages } = newBook;
    const result = await db.query(
        "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
        [id, title, type, author, topic, publication_date, pages]
    );
    return result.rows[0];
};

const deleteBook = async (id) => {
    const result = await db.query(
        "DELETE FROM books WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};




module.exports = router
