const bookTitle = document.getElementById('book-title');
const authorName = document.getElementById('author-name');
const nPages = document.getElementById('pages');
const readCheck = document.getElementById('read-check');
const saveButton = document.getElementById('save-btn');
const tBody = document.getElementById('table');
const tRows = document.getElementsByTagName('tr');
const addBook = document.getElementById('add-book');
const form = document.getElementById('form');
const nError = document.getElementById('number-error');
const deleteBtn = document.getElementsByClassName('delete-btn');

function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read === false) {
    this.read = 'not read yet';
  } else {
    this.read = 'already read';
  }
  this.index = index;
}

Book.prototype.info = function () {
  return `${this.title}, ${this.author}, ${this.pages}, ${this.read}.`;
};

let myLibrary = [];

function deleteRow(index) {
  const rowArray = Array.from(tRows).slice(1);
  for (let i = 0; i <= rowArray.length - 1; i += 1) {
    const idxRow = Number(rowArray[i].dataset.index);
    console.log(i, rowArray[i].dataset.index);
    if (idxRow === index) {
      tBody.deleteRow(index);

      console.log(rowArray);
    }
  }
}

function deleteBook() {
  Array.from(deleteBtn).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idxRow = Number(e.target.dataset.index);
      const newLib = myLibrary.reduce((arr, book) => {
        if (book.index !== idxRow) {
          arr.push({
            ...book,
            index: arr.length,
          });
        }
        return arr;
      }, []);
      myLibrary = newLib;
      deleteRow(idxRow);
    });
  });
}

function addRow(e) {
  e.preventDefault();
  tBody.innerHTML = '';
  myLibrary.forEach((book) => {
    const bookValues = Object.values(book);
    const newRow = tBody.insertRow(0);
    const button = document.createElement('button');
    for (let i = 0; i < 4; i += 1) {
      const newCell = newRow.insertCell(i);
      const contentCell = document.createTextNode(bookValues[i]);
      newCell.appendChild(contentCell);
    }
    button.setAttribute('class', 'delete-btn');
    button.setAttribute('data-index', book.index);
    button.textContent = 'Supprimer';
    newRow.appendChild(button);
    newRow.dataset.index = book.index;
  });
  deleteBook();
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
  myLibrary.unshift(bookSaved);
  addRow(e, myLibrary);
  form.reset();
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
