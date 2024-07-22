import React from 'react';
import MetronomeButton from '@components/metronome';
import { render, fireEvent } from '@testing-library/react';
import { playMetronome, stopMetronome } from '@components/metronome/service';

jest.mock('@components/metronome/service', () => ({
  playMetronome: jest.fn(),
  stopMetronome: jest.fn(),
}));

jest.mock('@assets/images/metronome.webp', () => 'mockMetronomeIcon');

describe('MetronomeButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the button with the correct icon', () => {
    const { getByRole } = render(<MetronomeButton />);
    const button = getByRole('button');
    const icon = button.querySelector('img');

    expect(button).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'mockMetronomeIcon');
  });

  it('Should call playMetronome when the button is pressed', () => {
    const { getByRole } = render(<MetronomeButton />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(playMetronome).toHaveBeenCalledTimes(1);
  });

  it('Should call stopMetronome when the button is pressed again', () => {
    const { getByRole } = render(<MetronomeButton />);
    const button = getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(playMetronome).toHaveBeenCalledTimes(1);
    expect(stopMetronome).toHaveBeenCalled();
  });

  it('Should add the pressed class when the button is pressed', () => {
    const { getByRole } = render(<MetronomeButton />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(button).toHaveClass('metronome-button-pressed');
  });

  it('Should remove the pressed class when the button is pressed again', () => {
    const { getByRole } = render(<MetronomeButton />);
    const button = getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).not.toHaveClass('metronome-button-pressed');
  });
});
