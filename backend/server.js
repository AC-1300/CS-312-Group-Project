const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample book data
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publicationDate: "1925",
    rating: 4.5,
    description: "A novel about the decline of the American Dream."
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publicationDate: "1949",
    rating: 4.8,
    description: "A chilling prophecy about the future."
  }
];

// Get all books
app.get("/api/books", (req, res) => {
  const { search = "", sort = "" } = req.query;
  let filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.genre.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "date") {
    filtered.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
  }

  res.json(filtered);
});

// Get single book by ID
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
