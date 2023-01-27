const bookTitle = document.getElementById('book-title');
const authorName = document.getElementById('author-name');
const nPages = document.getElementById('pages');
const readCheck = document.getElementById('read-check');
const saveButton = document.getElementById('save-btn');
const tBody = document.getElementById('table');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read === false) {
    this.read = 'not read yet';
  } else {
    this.read = 'already read';
  }
}

Book.prototype.info = function () {
  return `${this.title}, ${this.author}, ${this.pages}, ${this.read}.`;
};

const myLibrary = [
  new Book('Promises', 'Boo Flee', '928', false),
  new Book('Elze', 'Mektour Ahmed', '685', true),
  new Book('Hall Pieces', 'Voisin Merche', '68', true),
];

function addRow() {
  myLibrary.forEach((book) => {
    const bookValues = Object.values(book);
    const newRow = tBody.insertRow(0);
    for (let i = 0; i < 4; i += 1) {
      const newCell = newRow.insertCell(i);
      const contentCell = document.createTextNode(bookValues[i]);
      newCell.appendChild(contentCell);
    }
  });
}

function addBookToLibrary() {
  let isInputFalse = false;
  const bookSaved = new Book(
    bookTitle.value,
    authorName.value,
    nPages.value,
    readCheck.checked
  );
  const arrValues = Object.values(bookSaved);
  arrValues.forEach((val) => {
    if (val === '') {
      isInputFalse = true;
    }
  });
  if (isInputFalse) return;
  myLibrary.push(bookSaved);
}

saveButton.addEventListener('click', addRow);
