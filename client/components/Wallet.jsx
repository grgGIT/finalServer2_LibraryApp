import React, { useState, useEffect } from 'react';
import { getUserBalance } from '../services/dataService'; // Adjust the import path as necessary

//this should grab their balance from the JSON and display it on the wallet page
const Wallet = ({ userId }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const balance = getUserBalance(userId);
    setBalance(balance);
  }, [userId]);

  return (
    <div>
      <h2>Wallet Balance</h2>
      <p>${balance}</p>
    </div>
  );
};

export default Wallet;