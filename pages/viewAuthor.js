import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewBook = (obj) => {
  clearDom();

  let domString = `
  <div class="mt-5 d-flex flex-wrap">
   <div class="d-flex flex-column">
   <div class="text-white ms-5 details">
     <h5> by ${obj.first_name} ${obj.last_name}${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
     Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
     <hr>
        <i class="btn btn-info" id="update-author--${obj.firebaseKey}"><span class="fas fa-edit"></span></i>
        <i class="btn btn-danger" id="delete-author-btn--${obj.firebaseKey}"><span class="fas fa-trash-alt"></span></i>
     </div>
     </div>`;

  obj.books.forEach((item) => {
    domString += `
           <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
            <hr>
            <i class="btn btn-success" id="view-book-btn--${item.firebaseKey}"><span class="fas fa-eye"></span></i>
        <i class="btn btn-info" id="update-book--${item.firebaseKey}"><span class="fas fa-edit"></span></i>
        <i class="btn btn-danger" id="delete-book-btn--${item.firebaseKey}"><span class="fas fa-trash-alt"></span></i>
        </div>
      </div>`;
  });

  renderToDOM('#view', domString);
};

export default viewBook;
