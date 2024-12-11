import React, { useState, useEffect } from 'react';
import { getUserData, returnBook } from '../services/dataService'; // Import functions to interact with JSON

//this gets the user data from the JSON and displays the user's account information and their rented books
const UserAccount = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = getUserData(userId);
    setUserData(data);
  }, [userId]);

  const handleReturn = (bookId) => {
    returnBook(userId, bookId);
    const updatedData = getUserData(userId);
    setUserData(updatedData);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h2>{userData.name}'s Account</h2>
      <p>Wallet Balance: ${userData.wallet}</p>
      <h3>Rented Books:</h3>
      <ul>
        {userData.rentedBooks.map((bookId) => (
          <li key={bookId}>
            Book ID: {bookId} <button onClick={() => handleReturn(bookId)}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAccount;