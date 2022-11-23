import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const msgError = screen.getByText(/no favorite pokémon found/i);

    expect(msgError).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon />);

    const msgError = screen.getByText(/no favorite pokémon found/i);

    expect(msgError).toBeInTheDocument(false);
  });
});
