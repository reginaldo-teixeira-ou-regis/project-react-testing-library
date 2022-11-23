import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import About from '../pages/About';

describe('2. Teste o componente <About.js />, se a página contém as informações sobre a Pokédex', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    /* expect(history.location.pathname).toBe('/about'); */

    const titleAboutPokédex = screen.getByRole('heading', { name: /about pokédex/i });
    expect(titleAboutPokédex).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphOne = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const paragraphTwo = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);

    const imgAbout = screen.getByRole('img', { name: /pokédex/i });
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgAbout.src).toBe(urlImg);
    expect(imgAbout).toBeInTheDocument();
  });
});
