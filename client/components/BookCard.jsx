import React from 'react';
import ReviewThread from './ReviewThread.jsx';
import { updateBookQuantity, updateUserAccount } from '../services/dataService'; // Import functions to update JSON

//this should create a card for a given book and its how it will look in the grid, a gallery of cars, this also should allow you to rent and see the attributes of a book
const BookCard = ({ book, userId }) => {
  const handleRent = () => {
    if (book.quantity > 0) {
      updateBookQuantity(book.id, -1);
      updateUserAccount(userId, book.price, book.id);
    } else {
      alert('This book is out of stock.');
    }
  };

//matching a poster font to the genre of the book
  const getFontClass = (genre) => {
    const genreFontMap = {
      fiction: 'fiction-font',
      dystopian: 'dystopian-font',
      romance: 'romance-font',
    };
    return genreFontMap[genre.toLowerCase()] || 'default-font';
  };

  //the actual card filling of the fields
  return (
    <div className="book-card">
      <h3 className={getFontClass(book.genre || 'default')}>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Price: ${book.price}</p>
      <p>Quantity: {book.quantity}</p>
      <button onClick={handleRent}>Rent</button>
      <ReviewThread reviews={book.reviews} />
    </div>
  );
};

export default BookCard;