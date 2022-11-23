import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const titleNotFound = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });

    expect(titleNotFound).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByRole('img');
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imgNotFound.src).toBe(urlImg);
    expect(imgNotFound).toBeInTheDocument();
  });
});
