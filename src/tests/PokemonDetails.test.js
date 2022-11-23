import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const endPoint = '/pokemon/25';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(endPoint);
    });
    const titleDetails = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(titleDetails).toBeInTheDocument();
    const summaryDetails = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summaryDetails).toBeInTheDocument();
    const paragraph = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const altLocation = 'Pikachu location';
    act(() => {
      history.push(endPoint);
    });
    const titleMaps = screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
    expect(titleMaps).toBeInTheDocument();
    const imgMaps = screen.getAllByRole('img', { name: altLocation });
    expect(imgMaps).toHaveLength(2);
    const titleMap01 = screen.getByText(/kanto viridian forest/i);
    const titleMap02 = screen.getByText(/kanto power plant/i);
    expect(titleMap01).toBeInTheDocument();
    expect(titleMap02).toBeInTheDocument();
    expect(imgMaps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgMaps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgMaps[0]).toHaveAttribute('alt', altLocation);
    expect(imgMaps[1]).toHaveAttribute('alt', altLocation);
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(endPoint);
    });
    const favorited = screen.getByLabelText('Pokémon favoritado?');
    expect(favorited).toBeInTheDocument();
  });
});
