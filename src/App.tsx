import type { FormEvent } from 'react';
import { useState } from 'react';

type Book = {
  title: string;
  author: string;
};

export const BookShelf = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  const canSubmit = title.trim() !== '' && author.trim() !== '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanAuthor = author.trim();

    if (!cleanTitle || !cleanAuthor) {
      return;
    }

    setBooks((currentBooks) => [
      ...currentBooks,
      { title: cleanTitle, author: cleanAuthor },
    ]);

    setTitle('');
    setAuthor('');
  };

  return (
    <main>
      <h1>My Bookshelf</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="book-title">Book title</label>
        <input
          id="book-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="book-author">Author</label>
        <input
          id="book-author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />

        <button type="submit" disabled={!canSubmit}>
          Add book
        </button>
      </form>

      <section aria-live="polite">
        <h2>Bookshelf</h2>

        {books.length === 0 ? (
          <p>Your bookshelf is empty.</p>
        ) : (
          <ul>
            {books.map((book, index) => (
              <li key={`${book.title}-${book.author}-${index}`}>
                <strong>{book.title}</strong> by {book.author}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default BookShelf;
