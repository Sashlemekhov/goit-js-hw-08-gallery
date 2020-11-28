import galleryDataArr from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxBtnCloseRef = document.querySelector('.lightbox__button');
const lightboxImgRef = document.querySelector('.lightbox__image');

galleryListRef.addEventListener('click', openModalHandler);
lightboxOverlayRef.addEventListener('click', backdropClickHandler);
lightboxBtnCloseRef.addEventListener('click', closeModalByClickOnBtn);

// create Gallery Markup and add in DOM
function createGalleryMarkup(galleryDataArr) {
  return galleryDataArr.map(({preview, original, description}, index) => {
    return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          data-id="${index}"
          alt="${description}"
        />
        </a>
      </li>
    `
  }
  ).join('');
};
galleryListRef.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryDataArr));

// open modal
function openModalHandler(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  };

  window.addEventListener('keydown', closeModalByEsc);
  window.addEventListener('keydown', keyboardNavigationHandler);

  const largeImgURL = event.target.dataset.source;
  const largeImgAlt = event.target.getAttribute('alt');
  const largeImgId = event.target.dataset.id;

  lightboxRef.classList.add('is-open');
  lightboxImgRef.setAttribute('src', largeImgURL);
  lightboxImgRef.setAttribute('alt', largeImgAlt);
  lightboxImgRef.setAttribute('data-id', largeImgId);
};

//close modal
function closeModalHandler() {
  window.removeEventListener('keydown', closeModalByEsc);
  window.removeEventListener('keydown', keyboardNavigationHandler);

  lightboxImgRef.setAttribute('src', '');
  lightboxImgRef.setAttribute('alt', '');
  lightboxRef.classList.remove('is-open');
};

//close modal by click on backdrop
function backdropClickHandler(event) {
  if (event.target === event.currentTarget) {
    closeModalHandler();
  };
};

//close modal by click on close button
function closeModalByClickOnBtn(event)
{
  closeModalHandler();
};

//close modal by Esc
function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    closeModalHandler();
  };
};

//gallery big image navigation
function keyboardNavigationHandler(event) {
  let prevImgNumber = Number(lightboxImgRef.dataset.id) - 1;
  let nextImgNumber = Number(lightboxImgRef.dataset.id) + 1;
  let attributeURL = (indexOfArr) => lightboxImgRef.setAttribute('src', galleryDataArr[indexOfArr].original);
  let attributeAlt = (indexOfArr) => lightboxImgRef.setAttribute('alt', galleryDataArr[indexOfArr].description);
  let attributeId = (index) => lightboxImgRef.setAttribute('data-id', index);

  if (nextImgNumber === galleryDataArr.length) {
    nextImgNumber = 0;
  };

  if (prevImgNumber === -1) {
    prevImgNumber = galleryDataArr.length - 1;
  };
  
  if (event.code === 'KeyA' || event.code === 'ArrowLeft' || event.code === 'Numpad4') {
    attributeURL(prevImgNumber);
    attributeAlt(prevImgNumber);
    attributeId(prevImgNumber);
  };

  if (event.code === 'KeyD' || event.code === 'ArrowRight' || event.code === 'Numpad6') {
    attributeURL(nextImgNumber);
    attributeAlt(nextImgNumber);
    attributeId(nextImgNumber);
  };
};