import ButtonIcon from '@elements/button-icon';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ButtonIcon component', () => {
  const iconSrc = 'path/to/icon.png';
  const handleClick = jest.fn();

  it('Should render the button with the given icon', () => {
    render(<ButtonIcon icon={iconSrc} onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', iconSrc);
  });

  it('Should apply the given className to the button', () => {
    const customClass = 'custom-class';
    render(
      <ButtonIcon
        icon={iconSrc}
        onClick={handleClick}
        className={customClass}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('dm-button');
    expect(button).toHaveClass(customClass);
  });

  it('Should call the onClick handler when the button is clicked', () => {
    render(<ButtonIcon icon={iconSrc} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
