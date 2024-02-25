import client from '../utils/client';

const endpoint = client.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((responce) => responce.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// FIXME: CREATE AUTHOR
const createAuthor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors.json`, {
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

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebasekey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${firebasekey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((responce) => responce.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: UPDATE AUTHOR
const updateAuthor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
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

const getFavoriteAuthors = async () => {
  const authors = await getAuthors();
  const favorite = await authors.filter((obj) => obj.favorite);
  return favorite;
};

/* const getFavoriteAuthors = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const favoriteAuthors = Object.values(data.filter((obj) => obj.favorite));
        resolve(favoriteAuthors);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
}); */

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
  getFavoriteAuthors
};
