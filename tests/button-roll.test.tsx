import ButtonRoll from '@elements/button-roll';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ButtonRoll component', () => {
  const number = 5;
  const handleClick = jest.fn();

  it('Should render the button with the given number', () => {
    render(
      <ButtonRoll
        number={number}
        selected={false}
        playing={false}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(number.toString());
  });

  it('Should apply the selected class when selected is true', () => {
    render(
      <ButtonRoll
        number={number}
        selected={true}
        playing={false}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('button-roll-selected');
  });

  it('Should apply the playing class when playing is true', () => {
    render(
      <ButtonRoll
        number={number}
        selected={false}
        playing={true}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('button-roll-playing');
  });

  it('Should call the onClick handler with the correct index when clicked', () => {
    render(
      <ButtonRoll
        number={number}
        selected={false}
        playing={false}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(number - 1);
  });
});
