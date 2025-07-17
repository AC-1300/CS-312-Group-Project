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
    description: "A novel about the decline of the American Dream.",
    link: "https://en.wikipedia.org/wiki/The_Great_Gatsby"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publicationDate: "1949",
    rating: 4.7,
    description: "A chilling depiction of a totalitarian regime and surveillance.",
    link: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four"
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publicationDate: "1960",
    rating: 4.9,
    description: "A story about justice and racial inequality in the Deep South.",
    link: "https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird"
  },
  {
    id: 4,
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    publicationDate: "1932",
    rating: 4.3,
    description: "A futuristic society driven by technological advancement and conformity.",
    link: "https://en.wikipedia.org/wiki/Brave_New_World"
  },
  {
  id: 5,
  title: "Pride and Prejudice",
  author: "Jane Austen",
  genre: "Romance",
  publicationDate: "1813",
  rating: 4.8,
  description: "A classic novel about love and social standings.",
  link: "https://en.wikipedia.org/wiki/Pride_and_Prejudice"
},
{
  id: 6,
  title: "Moby-Dick",
  author: "Herman Melville",
  genre: "Adventure",
  publicationDate: "1851",
  rating: 4.1,
  description: "The epic tale of Captain Ahab’s obsession with a white whale.",
  link: "https://en.wikipedia.org/wiki/Moby-Dick"
},
{
  id: 7,
  title: "Jane Eyre",
  author: "Charlotte Brontë",
  genre: "Gothic",
  publicationDate: "1847",
  rating: 4.6,
  description: "A novel that follows the emotions and experiences of its heroine.",
  link: "https://en.wikipedia.org/wiki/Jane_Eyre"
},
{
  id: 8,
  title: "The Catcher in the Rye",
  author: "J.D. Salinger",
  genre: "Fiction",
  publicationDate: "1951",
  rating: 4.2,
  description: "A story about teenage angst and alienation.",
  link: "https://en.wikipedia.org/wiki/The_Catcher_in_the_Rye"
},
{
  id: 9,
  title: "Crime and Punishment",
  author: "Fyodor Dostoevsky",
  genre: "Philosophical fiction",
  publicationDate: "1866",
  rating: 4.7,
  description: "A psychological exploration of crime, guilt, and redemption.",
  link: "https://en.wikipedia.org/wiki/Crime_and_Punishment"
},
{
  id: 10,
  title: "War and Peace",
  author: "Leo Tolstoy",
  genre: "Historical fiction",
  publicationDate: "1869",
  rating: 4.5,
  description: "A sweeping narrative of Napoleonic-era Russia.",
  link: "https://en.wikipedia.org/wiki/War_and_Peace"
},
{
  id: 11,
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  publicationDate: "1937",
  rating: 4.8,
  description: "A prelude to the Lord of the Rings trilogy, following Bilbo Baggins’ journey.",
  link: "https://en.wikipedia.org/wiki/The_Hobbit"
},
{
  id: 12,
  title: "The Lord of the Rings",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  publicationDate: "1954",
  rating: 4.9,
  description: "An epic high fantasy novel about the battle against the Dark Lord Sauron.",
  link: "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings"
},
{
  id: 13,
  title: "Frankenstein",
  author: "Mary Shelley",
  genre: "Horror",
  publicationDate: "1818",
  rating: 4.4,
  description: "A novel exploring the dangers of unrestrained scientific exploration.",
  link: "https://en.wikipedia.org/wiki/Frankenstein"
},
{
  id: 14,
  title: "Dracula",
  author: "Bram Stoker",
  genre: "Gothic horror",
  publicationDate: "1897",
  rating: 4.3,
  description: "The original vampire novel that started it all.",
  link: "https://en.wikipedia.org/wiki/Dracula"
},
{
    id: 15,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publicationDate: "1949",
    rating: 4.9,
    description: "A chilling depiction of a totalitarian regime and constant surveillance.",
    link: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four"
  },
  {
    id: 16,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Southern Gothic",
    publicationDate: "1960",
    rating: 4.8,
    description: "A novel addressing serious issues like racial injustice in the Deep South.",
    link: "https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird"
  },
  {
    id: 17,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Tragedy",
    publicationDate: "1925",
    rating: 4.4,
    description: "A critical take on the American Dream during the Jazz Age.",
    link: "https://en.wikipedia.org/wiki/The_Great_Gatsby"
  },
  {
    id: 18,
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Science Fiction",
    publicationDate: "1932",
    rating: 4.3,
    description: "A dystopian novel exploring technology and societal control.",
    link: "https://en.wikipedia.org/wiki/Brave_New_World"
  },
  {
    id: 19,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Dystopian",
    publicationDate: "1953",
    rating: 4.5,
    description: "A novel about a society where books are outlawed and burned.",
    link: "https://en.wikipedia.org/wiki/Fahrenheit_451"
  },
  {
    id: 20,
    title: "The Odyssey",
    author: "Homer",
    genre: "Epic",
    publicationDate: "8th century BC",
    rating: 4.6,
    description: "An epic Greek poem about Odysseus’s long journey home.",
    link: "https://en.wikipedia.org/wiki/Odyssey"
  },
  {
    id: 21,
    title: "The Iliad",
    author: "Homer",
    genre: "Epic",
    publicationDate: "8th century BC",
    rating: 4.5,
    description: "The epic tale of the Trojan War and the wrath of Achilles.",
    link: "https://en.wikipedia.org/wiki/Iliad"
  },
  {
    id: 22,
    title: "Les Misérables",
    author: "Victor Hugo",
    genre: "Historical fiction",
    publicationDate: "1862",
    rating: 4.8,
    description: "A story of redemption, love, and revolution in 19th-century France.",
    link: "https://en.wikipedia.org/wiki/Les_Mis%C3%A9rables"
  },
  {
    id: 23,
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    genre: "Satire",
    publicationDate: "1605",
    rating: 4.4,
    description: "The adventures of a delusional knight and his loyal squire.",
    link: "https://en.wikipedia.org/wiki/Don_Quixote"
  },
  {
    id: 24,
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    genre: "Philosophical fiction",
    publicationDate: "1880",
    rating: 4.7,
    description: "A novel exploring morality, faith, and free will through three brothers.",
    link: "https://en.wikipedia.org/wiki/The_Brothers_Karamazov"
  },
  {
    id: 25,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Philosophical fiction",
    publicationDate: "1890",
    rating: 4.6,
    description: "A man remains youthful while his portrait reflects his moral decay.",
    link: "https://en.wikipedia.org/wiki/The_Picture_of_Dorian_Gray"
  },
  {
    id: 26,
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    genre: "Epic poetry",
    publicationDate: "1320",
    rating: 4.7,
    description: "Dante’s journey through Hell, Purgatory, and Paradise.",
    link: "https://en.wikipedia.org/wiki/Divine_Comedy"
  },
  {
    id: 27,
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    genre: "Historical novel",
    publicationDate: "1859",
    rating: 4.6,
    description: "A gripping narrative of sacrifice during the French Revolution.",
    link: "https://en.wikipedia.org/wiki/A_Tale_of_Two_Cities"
  },
  {
    id: 28,
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Tragedy",
    publicationDate: "1847",
    rating: 4.3,
    description: "A haunting tale of passion and revenge on the Yorkshire moors.",
    link: "https://en.wikipedia.org/wiki/Wuthering_Heights"
  },
  {
    id: 29,
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    genre: "Realist novel",
    publicationDate: "1878",
    rating: 4.7,
    description: "A tragic love story of a woman torn between duty and desire.",
    link: "https://en.wikipedia.org/wiki/Anna_Karenina"
  },
  {
    id: 30,
    title: "Great Expectations",
    author: "Charles Dickens",
    genre: "Bildungsroman",
    publicationDate: "1861",
    rating: 4.5,
    description: "The coming-of-age story of Pip and his moral development.",
    link: "https://en.wikipedia.org/wiki/Great_Expectations"
  },
  {
    id: 31,
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    genre: "Adventure",
    publicationDate: "1844",
    rating: 4.8,
    description: "A thrilling tale of betrayal, revenge, and redemption.",
    link: "https://en.wikipedia.org/wiki/The_Count_of_Monte_Cristo"
  },
  {
    id: 32,
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    genre: "Literary fiction",
    publicationDate: "1952",
    rating: 4.4,
    description: "The story of an aging fisherman’s epic battle with a giant marlin.",
    link: "https://en.wikipedia.org/wiki/The_Old_Man_and_the_Sea"
  },
  {
    id: 33,
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    genre: "Science fiction",
    publicationDate: "1969",
    rating: 4.3,
    description: "A nonlinear anti-war novel shaped by personal experience and satire.",
    link: "https://en.wikipedia.org/wiki/Slaughterhouse-Five"
  },
  {
    id: 34,
    title: "The Stranger",
    author: "Albert Camus",
    genre: "Philosophical novel",
    publicationDate: "1942",
    rating: 4.5,
    description: "A French existentialist classic exploring absurdism and detachment.",
    link: "https://en.wikipedia.org/wiki/The_Stranger_(Camus_novel)"
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
