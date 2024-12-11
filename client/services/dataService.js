import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, 'data.json');

//reads the data.json file
const readData = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

//writes to the data.json file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

//updates the book quantity to and from the data.json file
export const updateBookQuantity = (bookId, change) => {
  const data = readData();
  const book = data.books.find((b) => b.id === bookId);
  if (book) {
    book.quantity += change;
    writeData(data);
  }
};

//updates the UserAccount info and what will be displayed on the react page
export const updateUserAccount = (userId, price, bookId) => {
  const data = readData();
  const user = data.users.find((u) => u.id === userId);
  if (user) {
    user.wallet -= price;
    user.rentedBooks.push(bookId);
    writeData(data);
  }
};

export const getUserData = (userId) => {
  const data = readData();
  return data.users.find((u) => u.id === userId);
};

export const returnBook = (userId, bookId) => {
  const data = readData();
  const user = data.users.find((u) => u.id === userId);
  const book = data.books.find((b) => b.id === bookId);
  if (user && book) {
    user.wallet += book.price;
    user.rentedBooks = user.rentedBooks.filter((id) => id !== bookId);
    book.quantity += 1;
    writeData(data);
  }
};

export const getUserBalance = (userId) => {
  const data = readData();
  const user = data.users.find((u) => u.id === userId);
  return user ? user.wallet : 0;
};