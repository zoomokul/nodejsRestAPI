const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const JSON_FILE = 'all_page_books_2.json';

// Read all books
app.get('/api/books', (req, res) => {
  fs.readFile(JSON_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const books = JSON.parse(data);
    res.json(books);
  });
});

// Create a new book
app.post('/api/books', (req, res) => {
  fs.readFile(JSON_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const books = JSON.parse(data);
    const newBook = req.body;
    books.push(newBook);

    fs.writeFile(JSON_FILE, JSON.stringify(books), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).json(newBook);
    });
  });
});

// Update a book
app.put('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);

  fs.readFile(JSON_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const books = JSON.parse(data);
    const updatedBook = req.body;

    books.forEach((book, index) => {
      if (book.book_id === bookId) {
        books[index] = updatedBook;
      }
    });

    fs.writeFile(JSON_FILE, JSON.stringify(books), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(updatedBook);
    });
  });
});

// Delete a book
app.delete('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);

  fs.readFile(JSON_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const books = JSON.parse(data);

    const updatedBooks = books.filter((book) => book.book_id !== bookId);

    fs.writeFile(JSON_FILE, JSON.stringify(updatedBooks), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(204).send(); // No Content
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
