import { useState, useEffect } from "react";

export default function OnlineBookstore() {
  const [genre, setGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [reviewsData, setReviewsData] = useState({});
  const [reviewForm, setReviewForm] = useState({}); // bookId: username, rating, text  

  // Fetch books list based on search/sort from the backend 
  useEffect(() => {
    const params = new URLSearchParams({
      search, sort, genre, minRating, maxRating, fromYear, toYear
    });
	  
    fetch(`http://localhost:5000/api/books?search=${search}&sort=${sort}`)
      .then(res => res.json())
      .then(setBooks);
  }, [search, sort, genre, minRating, maxRating, fromYear, toYear]);

  // Search
useEffect(() => {
  if (search.length > 1) {
    fetch(`http://localhost:5000/api/suggestions?q=${search}`)
      .then(res => res.json())
      .then(setSuggestions);
  } else {
    setSuggestions([]);
  }
}, [search]);
	
  // Fetch reviews 
  const fetchReviews = (bookId) => {
    fetch(`http://localhost:5000/api/books/${bookId}/reviews`)
      .then(res => res.json())
      .then(revs => setReviewsData(old => ({ ...old, [bookId]: revs })));
  };

  // Shows what books have the reviwe section open and toggles visblity of the reveiw
  const [showReviews, setShowReviews] = useState({}); // bookId: true/false }
  const toggleReviews = (bookId) => {
    setShowReviews(old => ({
      ...old,
      [bookId]: !old[bookId]
    }));
    if (!reviewsData[bookId]) fetchReviews(bookId);
  };

  //updates the form for the book and user and rating or the text, based on what the user texts 
  const handleInputChange = (bookId, field, value) => {
    setReviewForm((old) => ({
      ...old,
      [bookId]: {
        ...old[bookId],
        [field]: value,
      },
    }));
  };

  //submits a review to the api, and adds the new reivew, and clears the form 
  const handleReviewSubmit = (e, bookId) => {
    e.preventDefault();
    const { username, rating, text } = reviewForm[bookId] || {};
    if (!username || !rating || !text) return;

    fetch(`http://localhost:5000/api/books/${bookId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, rating, text }),
    })
      .then((res) => res.json())
      .then((newReview) => { //adding the new review 
        setReviewsData((old) => ({
          ...old,
          [bookId]: old[bookId] ? [...old[bookId], newReview] : [newReview],
        }));
        setReviewForm((old) => ({ //clearing the old review
          ...old,
          [bookId]: { username: "", rating: "", text: "" },
        }));
      });
  };

  return (
    /*the search and sort controls and the wrap*/
    <div className="bookstore-container">
      <h1>Online Bookstore</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="form-control bookstore-search-input d-inline-block"
        style={{ width: "220px", marginRight: "10px" }}
      />
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="form-select bookstore-sort-select d-inline-block"
        style={{ width: "180px" }}
      >
        <option value="">Sort by</option>  {/*the sort button*/}
        <option value="rating">Rating</option>
        <option value="date">Publication Date</option>
      </select>
	          <select value={genre} onChange={e => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Dystopian">Dystopian</option>
      </select> 

      <input
        type="number"
        placeholder="Min Rating"
        value={minRating}
        onChange={e => setMinRating(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Rating"
        value={maxRating}
        onChange={e => setMaxRating(e.target.value)}
      />

      <input
        type="number"
        placeholder="From Year"
        value={fromYear}
        onChange={e => setFromYear(e.target.value)}
      />

      <input
        type="number"
        placeholder="To Year"
        value={toYear}
        onChange={e => setToYear(e.target.value)}
      />
      <button onClick={() => {
        setSearch("");
        setSort("");
        setGenre("");
        setMinRating("");
        setMaxRating("");
        setFromYear("");
        setToYear("");
      }}>
        Clear Filters
      </button>
      <ul>
        {suggestions.map((s, idx) => (
          <li 
            key={idx} 
            onClick={() => {
              setSearch(s)
              setSuggestions([]);
            }}
            style={{
              padding:"5px 10px",
              cursor: "pointer",
              borderBottom: "1px solid #eee"
            }}
            >
              {s}
            </li>
        ))}
      </ul>

       {/*loops through to make sure there is only one card per book*/}
      <div className="book-list row mt-3">
        {books.map(book => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={book.id}>
            <div className="card h-100 book-item">
              <div className="card-body">  {/*all the boook detials and UI*/}
                <h5>
			<a href={book.link} target="_blank" rel="noopener noreferrer" style={{ color: "#1a0dab", textDecoration: "none" }}>
				{book.title}
			</a>
		</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text mb-1"><strong>Genre:</strong> {book.genre}</p>
                <p className="card-text mb-1"><strong>Rating:</strong> {book.rating}</p>
                <p className="card-text small">{book.description}</p>
                
                {/*Review button*/}
                <button  
                  className="btn btn-outline-primary btn-sm mt-3"
                  onClick={() => toggleReviews(book.id)}
                  type="button"
                >
                  {showReviews[book.id] ? "Hide Reviews" : "Show Reviews"}
                </button>

                {/*Review Section*/}
                {showReviews[book.id] && (
                  <div className="review-section mt-3">
                    {/*this should display the form */}
                    <h6 className="mb-2">Reviews</h6>
                    {(reviewsData[book.id] && reviewsData[book.id].length > 0) ? (
                      
                      <div className="review-list mb-3">
                        {reviewsData[book.id].map((review, idx) => (
                          <div className="mb-2" key={idx}>
                            <span className="fw-bold me-2">{review.username}</span>
                            {/*stuck at five star for some reason????*/}
                            <span className="text-warning">{'★'.repeat(review.rating)}<span className="text-secondary">{'★'.repeat(5 - review.rating)}</span></span> 
                            <div className="text-muted small">{review.date ? review.date.slice(0,10) : ""}</div>
                            <div>{review.text}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      
                      <div className="text-secondary mb-3">
                        No reviews yet.
                      </div>
                    )}

                    {/* Review Form */}
                    <form
                      className="review-form"
                      onSubmit={e => handleReviewSubmit(e, book.id)}
                    >
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Your name"
                        value={reviewForm[book.id]?.username ?? ""}
                        onChange={e => handleInputChange(book.id, 'username', e.target.value)}
                        required
                      />
                      <select
                        className="form-select mb-2"
                        value={reviewForm[book.id]?.rating ?? ""}
                        onChange={e => handleInputChange(book.id, 'rating', e.target.value)}
                        required
                      >
                        <option value="">Rating</option>
                        {[1,2,3,4,5].map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      <textarea
                        className="form-control mb-2"
                        placeholder="Write your review..."
                        value={reviewForm[book.id]?.text ?? ""}
                        onChange={e => handleInputChange(book.id, 'text', e.target.value)}
                        required
                        rows={2}
                      />
                      <button type="submit" className="btn btn-success btn-sm">
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
                {/*Review end*/}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
