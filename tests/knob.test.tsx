import DMKnob from '@elements/knob';
import knob from '@assets/images/knob.webp';
import { render, screen, fireEvent } from '@testing-library/react';

describe('DMKnob component', () => {
  const size = 100;
  const defaultValue = 50;
  const min = 0;
  const max = 100;
  const title = 'Volume';
  const handleChange = jest.fn();

  it('should render the knob with the given properties', () => {
    render(
      <DMKnob
        size={size}
        onChange={handleChange}
        defaultValue={defaultValue}
        min={min}
        max={max}
        title={title}
      />,
    );

    const input = screen.getByRole('slider');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-diameter', size.toString());
    expect(input).toHaveProperty('defaultValue', defaultValue.toString());
    expect(input).toHaveAttribute('min', min.toString());
    expect(input).toHaveAttribute('max', max.toString());
    expect(input).toHaveAttribute('data-src', knob);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should call the onChange handler with the correct value when the knob value changes', () => {
    render(
      <DMKnob
        size={size}
        onChange={handleChange}
        defaultValue={defaultValue}
        min={min}
        max={max}
      />,
    );

    const input = screen.getByRole('slider');
    fireEvent.input(input, { target: { value: '75' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(75);
  });

  it('should render without title if title is not provided', () => {
    render(
      <DMKnob
        size={size}
        onChange={handleChange}
        defaultValue={defaultValue}
        min={min}
        max={max}
      />,
    );

    const titleElement = screen.queryByText(title);
    expect(titleElement).not.toBeInTheDocument();
  });
});
