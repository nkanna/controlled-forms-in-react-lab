import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BookShelf } from './App';

describe('BookShelf', () => {
  it('keeps the input state synchronized with typing', async () => {
    const user = userEvent.setup();

    render(<BookShelf />);

    const titleInput = screen.getByLabelText('Book title');

    await user.type(titleInput, 'Dune');

    expect(titleInput).toHaveValue('Dune');
  });

  it('adds books, clears the form, and preserves previous books', async () => {
    const user = userEvent.setup();

    render(<BookShelf />);

    async function submitBook(title: string, author: string) {
      await user.type(screen.getByLabelText('Book title'), title);
      await user.type(screen.getByLabelText('Author'), author);
      await user.click(screen.getByRole('button', { name: 'Add book' }));
    }

    await submitBook('Dune', 'Frank Herbert');
    await submitBook('Neuromancer', 'William Gibson');

    expect(screen.getByText('Dune')).toBeInTheDocument();
    expect(screen.getByText('Neuromancer')).toBeInTheDocument();
    expect(screen.getByLabelText('Book title')).toHaveValue('');
    expect(screen.getByLabelText('Author')).toHaveValue('');
  });
});