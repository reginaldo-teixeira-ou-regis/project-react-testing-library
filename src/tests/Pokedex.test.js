import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const subtitle = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });

    expect(subtitle).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const btnProximo = screen.getByTestId('next-pokemon');
    const pokemonName = screen.getByTestId('pokemon-name');

    pokemonList.forEach((pokemon) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(btnProximo);
    });
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const listName = screen.getAllByTestId('pokemon-name');
    const btnProximo = screen.getByTestId('next-pokemon');
    pokemonList.forEach(() => {
      expect(listName).toHaveLength(1);
      userEvent.click(btnProximo);
    });
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const listTypesPokemon = screen.getAllByTestId('pokemon-type-button');
    const typesPokemon = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    listTypesPokemon.forEach((filter, index) => {
      expect(filter.textContent).toBe(typesPokemon[index]);
      expect(btnAll).toBeInTheDocument();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /all/i });

    expect(btnAll).toBeInTheDocument();
    expect(btnAll).not.toHaveAttribute('data-testid', 'pokemon-type-button');
    userEvent.click(btnAll);
  });
});
