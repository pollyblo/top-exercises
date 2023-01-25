function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read === false) {
    this.read = 'not read yet';
  } else {
    this.read = 'already read';
  }
  this.info = () =>
    `${this.title}, ${this.author}, ${this.pages}, ${this.read}.`;
}

const book1 = new Book('Trembling', 'The Dusk', 485, false);
console.log(book1.info());
