const bookTitle = document.getElementById('book-title');
const authorName = document.getElementById('author-name');
const nPages = document.getElementById('pages');
const readCheck = document.getElementById('read-check');
const saveButton = document.getElementById('save-btn');
const tBody = document.getElementById('table');
const addBook = document.getElementById('add-book');
const form = document.getElementById('form');
const nError = document.getElementById('number-error');
const deleteBtn = document.getElementsByClassName('delete-btn');
const readToggle = document.getElementsByClassName('read-toggle');
let myLibrary = [];

function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
  this.isRead = () => {
    this.read = !this.read;
    return this;
  };
}

function updateRow() {
  tBody.innerHTML = '';
  myLibrary.forEach((book) => {
    let contentCell;
    const bookValues = Object.values(book);
    const newRow = tBody.insertRow(0);
    const button = document.createElement('button');
    for (let i = 0; i < 4; i += 1) {
      const newCell = newRow.insertCell(i);
      if (i === 3) {
        contentCell = document.createElement('button');
        contentCell.setAttribute('class', 'read-toggle');
        contentCell.setAttribute('data-index', book.index);
        contentCell.textContent = bookValues[i];
      } else {
        contentCell = document.createTextNode(bookValues[i]);
      }
      newCell.appendChild(contentCell);
    }
    button.setAttribute('class', 'delete-btn');
    button.setAttribute('data-index', book.index);
    button.textContent = 'Supprimer';
    newRow.appendChild(button);
  });
  deleteBook();
  toggleReading();
}

function deleteBook() {
  Array.from(deleteBtn).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idxRow = e.target.dataset.index;
      myLibrary = myLibrary.reduce((arr, book) => {
        if (book.index !== Number(idxRow)) {
          arr.push({
            ...book,
            index: arr.length,
          });
        }
        return arr;
      }, []);
      updateRow();
    });
  });
}

function addBookToLibrary(e) {
  e.preventDefault();
  const isPageNumber = Number.isNaN(Number(nPages.value));
  const bookSaved = new Book(
    bookTitle.value,
    authorName.value,
    nPages.value,
    readCheck.checked,
    myLibrary.length
  );
  const arrValues = Object.values(bookSaved);
  let isInputFalse = false;
  arrValues.forEach((val) => {
    if (val === '') {
      isInputFalse = true;
    }
  });
  if (isInputFalse || isPageNumber) return;
  myLibrary.push(bookSaved);
  for (let i = 0; i < myLibrary.length; i += 1) {
    myLibrary[i].index = i;
  }
  updateRow();
  form.reset();
}

function toggleReading() {
  Array.from(readToggle).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idxToggle = Number(e.target.dataset.index);
      myLibrary = myLibrary.map((book) =>
        book.index === idxToggle ? book.isRead() : book
      );
      updateRow();
    });
  });
}

saveButton.addEventListener('click', addBookToLibrary);

addBook.addEventListener('click', () => {
  form.style.display = 'flex';
});

nPages.addEventListener('input', (e) => {
  if (Number.isNaN(Number(e.target.value))) {
    nError.style.display = 'block';
  } else {
    nError.style.display = 'none';
  }
});
