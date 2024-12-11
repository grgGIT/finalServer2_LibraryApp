import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import './BookGrid.css'; // Ensure your CSS file includes styles for different genres

//is what creates the layout of books in a grid format
const BookGrid = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(() => {
        import('./books.json').then(module => setBooks(module.default));
      });
  }, []);

  return (
    <div className="book-grid">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;