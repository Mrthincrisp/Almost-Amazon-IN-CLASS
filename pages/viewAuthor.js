import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewBook = (obj) => {
  // console.warn(obj);
  clearDom();
  const images = obj.books.map((book) => ({
    image: book.image,
    price: book.price,
    sale: book.sale,
    title: book.title,
    firebaseKey: book.firebaseKey
  }));

  // console.warn(images);

  let domString = `
  <div class="mt-5 d-flex flex-wrap">
   <div class="d-flex flex-column">
   <div class="text-white ms-5 details">
     <h5> by ${obj.first_name} ${obj.last_name}${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
     Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
     <hr>
     </div>
     </div>`;

  images.forEach((image) => {
    domString += `
           <div class="card">
        <img class="card-img-top" src=${image.image} alt=${image.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${image.title}</h5>
            <p class="card-text bold">${image.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${image.price}` : `$${image.price}`}</p>
            <hr>
            <i class="btn btn-success fa fa-eye" id="view-book-btn--${image.firebaseKey}"></i>
            <i id="edit-book-btn--${image.firebaseKey}" class="fa fa-edit btn btn-info"></i>
            <i id="delete-book-btn--${image.firebaseKey}" class="btn btn-danger <span class="fas fa-trash-alt"></i>
        </div>
      </div>`;
  });

  renderToDOM('#view', domString);
};

export default viewBook;
