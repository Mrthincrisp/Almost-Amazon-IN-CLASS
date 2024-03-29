import client from '../utils/client';
import { getAuthors } from './authorData';
// API CALLS FOR BOOKS

const endpoint = client.databaseURL;

// TODO: GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// TODO: CREATE BOOK
const createBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE BOOK
const updateBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// TODO: FILTER BOOKS ON SALE
const booksOnSale = async (uid) => {
  const books = await getBooks(uid);
  const onSale = await books.filter((item) => item.sale);
  return onSale;
};

// TODO: STRETCH...SEARCH BOOKS
const searchStore = async (searchValue, uid) => {
  const allBooks = await getBooks(uid);
  const allAuthors = await getAuthors(uid);
  const filterBooks = await allBooks.filter((book) => (
    book.title.toLowerCase().includes(searchValue)
  || book.description.toLowerCase().includes(searchValue)
  ));

  const filterAuthors = await allAuthors.filter((author) => (
    author.first_name.toLowerCase().includes(searchValue)
  || author.last_name.toLowerCase().includes(searchValue)
  || author.email.toLowerCase().includes(searchValue)
  ));
  return { books: filterBooks, authors: filterAuthors };
};

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
  searchStore
};
