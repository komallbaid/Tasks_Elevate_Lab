const express=require('express');
const app=express();

app.use(express.json());

let books=[
    {id:1,title:'The Hobbit',author:'J.R.R Tolkien'},
    {id:2,title:'1984', author:'George Orwell'}
];

//get books- return all books
app.get('/books', (req,res)=>{
    res.json(books);
});

//GET /books/:id - return a book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST /books - add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author required' });


  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update a book by ID
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE /books/:id - remove a book by ID
app.delete('/books/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  const deletedBook = books.splice(idx, 1);
  res.json(deletedBook[0]);
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});