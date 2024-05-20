const openModalBtn = document.querySelector('header button');
const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelBtn = document.getElementById('cancel-btn');
const movieList = document.getElementById('movie-list');
const addNewMovieBtn = cancelBtn.nextElementSibling;
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
const editModal = document.getElementById('edit-modal');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const confirmEditBtn = document.getElementById('confirm-edit-btn');
const moviesStorage = [];
const inputs = modal.getElementsByTagName('input');
const editInputs = editModal.getElementsByTagName('input');

let movieToDelete = null;
let movieToEdit = null;

const toggleMovieModal = () => {
  backdrop.classList.toggle('visible');
  modal.classList.toggle('visible');
};

const toggleEditModal = () => {
  backdrop.classList.toggle('visible');
  editModal.classList.toggle('visible');
};

const toggleDeleteModal = () => {
  deleteModal.classList.toggle('visible');
  backdrop.classList.toggle('visible');
};

const cancelAddMovie = () => {
  toggleMovieModal();
};

const cancelEditMovie = () => {
  toggleEditModal();
};

const cancelDeleteMovie = () => {
  toggleDeleteModal();
  movieToDelete = null;
};

const renderMovies = () => {
  movieList.innerHTML = '';
  moviesStorage.forEach((movie, index) => {
    const newMovieEl = document.createElement('li');
    newMovieEl.className = 'movie-element';
    newMovieEl.innerHTML = `
      <div class='movie-element__image'>
        <img src='${movie.image}' alt='${movie.title}' />
      </div>
      <div class='movie-element__info'>
        <h2>${movie.title}</h2>
        <p>${movie.rating}/5</p>
      </div>
      <button class="btn btn--danger">Delete</button>
      <button class="btn btn--success">Edit</button>
    `;

    newMovieEl.querySelector('.btn--danger').addEventListener('click', showDeleteModal.bind(null, index));
    newMovieEl.querySelector('.btn--success').addEventListener('click', showEditModal.bind(null, index));

    movieList.appendChild(newMovieEl);
  });
};

const showDeleteModal = (movieIndex) => {
  movieToDelete = movieIndex;
  toggleDeleteModal();
};

const deleteMovieHandler = () => {
  if (movieToDelete === null) return;

  moviesStorage.splice(movieToDelete, 1);
  renderMovies();
  cancelDeleteMovie();
};

const showEditModal = (movieIndex) => {
  movieToEdit = movieIndex;
  editInputs[0].value = moviesStorage[movieIndex].title;
  editInputs[1].value = moviesStorage[movieIndex].image;
  editInputs[2].value = moviesStorage[movieIndex].rating;
  toggleEditModal();
};

const editMovieHandler = () => {
  if (movieToEdit === null) return;

  moviesStorage[movieToEdit].title = editInputs[0].value;
  moviesStorage[movieToEdit].image = editInputs[1].value;
  moviesStorage[movieToEdit].rating = editInputs[2].value;

  renderMovies();
  cancelEditMovie();
};

const addMovieFromHandler = () => {
  const title = inputs[0].value;
  const image = inputs[1].value;
  const rating = inputs[2].value;
  const newMovie = { title, image, rating };

  moviesStorage.push(newMovie);
  for (const input of inputs) {
    input.value = '';
  }
  renderMovies();
  cancelAddMovie();
};

openModalBtn.addEventListener('click', toggleMovieModal);
cancelBtn.addEventListener('click', cancelAddMovie);
addNewMovieBtn.addEventListener('click', addMovieFromHandler);
cancelDeleteBtn.addEventListener('click', cancelDeleteMovie);
confirmDeleteBtn.addEventListener('click', deleteMovieHandler);
cancelEditBtn.addEventListener('click', cancelEditMovie);
confirmEditBtn.addEventListener('click', editMovieHandler);
