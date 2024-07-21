import React from 'react';
import ButtonText from '@elements/button-text';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ButtonText component', () => {
  const text = 'Click Me';
  const handleClick = jest.fn();

  it('Should render the button with the given text', () => {
    render(<ButtonText text={text} callback={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(text);
  });

  it('Should apply the given className to the button', () => {
    const customClass = 'custom-class';
    render(
      <ButtonText text={text} callback={handleClick} className={customClass} />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('dm-button-text');
    expect(button).toHaveClass(customClass);
  });

  it('Should call the callback handler when the button is clicked', () => {
    render(<ButtonText text={text} callback={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
