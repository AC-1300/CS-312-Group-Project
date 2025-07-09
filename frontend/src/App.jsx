import { useState, useEffect } from "react";

export default function OnlineBookstore() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/books?search=${search}&sort=${sort}`)
      .then(res => res.json())
      .then(setBooks);
  }, [search, sort]);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Online Bookstore</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="rating">Rating</option>
        <option value="date">Publication Date</option>
      </select>
      <div style={{ marginTop: 20 }}>
        {books.map(book => (
          <div key={book.id} style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Rating:</strong> {book.rating}</p>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
