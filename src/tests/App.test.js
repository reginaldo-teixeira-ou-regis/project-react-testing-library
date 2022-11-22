import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* import { createMemoryHisotry } from 'history'; */
/* import { Router } from 'react-router-dom'; */
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    it('O primeiro link deve possuir o texto Home', () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: /home/i });
      expect(linkHome).toBeInTheDocument();
      expect(history.location.pathname).toBe('/');
    });

    it('O segundo link deve possuir o texto About', () => {
      const { history } = renderWithRouter(<App />);

      const linkAbout = screen.getByRole('link', { name: /about/i });
      expect(linkAbout).toBeInTheDocument();
      expect(history.location.pathname).toBe('/');
    });

    it('O terceiro link deve possuir o texto Favorite Pokémon', () => {
      const { history } = renderWithRouter(<App />);

      const linkFavoritePokémon = screen.getByRole('link', { name: /Favorite Pokémon/i });
      expect(linkFavoritePokémon).toBeInTheDocument();
      expect(history.location.pathname).toBe('/');
    });
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(history.location.pathname).toBe('/');

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(history.location.pathname).toBe('/');

    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokémon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(history.location.pathname).toBe('/');

    userEvent.click(linkFavoritePokémon);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    const urlInvalid = '/xablau';
    act(() => {
      history.push(urlInvalid);
    });
    const titleNotFound = screen.getByRole('heading', { name: /page requested not found/i });
    const imgNotFound = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(titleNotFound).toBeDefined();
    expect(imgNotFound).toBeDefined();
  });
});
