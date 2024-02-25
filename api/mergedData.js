import { deleteBook, getSingleBook } from './bookData';
import { getSingleAuthor, getAuthorBooks, deleteSingleAuthor } from './authorData';

const getBookDetails = async (bookFirebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise)
  const bookObject = await getSingleBook(bookFirebaseKey); // await stops the code in this function and waits for the response. This is like using .then
  const authorObject = await getSingleAuthor(bookObject.author_id); // this function uses the data response from the bookObject

  return { ...bookObject, authorObject };
};

const getAuthorDetails = async (authorFirebaseKey) => {
  const authorObject = await getSingleAuthor(authorFirebaseKey);
  const authorsBooks = await getAuthorBooks(authorFirebaseKey);
  return { ...authorObject, books: authorsBooks };
};

const deleteAuthorAndAuthorBooks = async (authorFirebaseKey) => {
  const AuthorBooks = await getAuthorBooks(authorFirebaseKey);
  const deleteBooks = await AuthorBooks.map((abObj) => deleteBook(abObj.firebaseKey));

  await Promise.all(deleteBooks).then(() => deleteSingleAuthor(authorFirebaseKey));
};

export { getBookDetails, getAuthorDetails, deleteAuthorAndAuthorBooks };
