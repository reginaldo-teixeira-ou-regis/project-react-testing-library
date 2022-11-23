import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img');

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(/average weight: 6\.0 kg/i);
    expect(img).toBeInTheDocument();
    expect(img.alt).toBe('Pikachu sprite');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toHaveAttribute('href', '/pokemon/25');
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe('/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favorite = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorite).not.toBeInTheDocument();

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);

    const newFavorite = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });

    expect(newFavorite).toBeInTheDocument();
    expect(newFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
