import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MovieRow from './MovieRow.jsx';

const items = {
  results: [
    { id: 1, title: 'Filme com poster', poster_path: '/a.jpg' },
    { id: 2, title: 'Filme sem poster', poster_path: null },
  ],
};

describe('MovieRow', () => {
  it('renderiza apenas os itens que têm poster', () => {
    render(<MovieRow title="Ação" items={items} />);

    expect(screen.getByRole('heading', { name: 'Ação' })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByAltText('Filme com poster')).toBeInTheDocument();
  });

  it('não renderiza nada quando a lista está vazia', () => {
    const { container } = render(<MovieRow title="Terror" items={{ results: [] }} />);

    expect(container).toBeEmptyDOMElement();
  });
});
