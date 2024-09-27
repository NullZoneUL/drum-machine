import NumSelector, {
  START_MOUSE_DOWN_TIMEOUT,
  MOUSE_DOWN_TIMEOUT,
} from '@elements/num-selector';
import { render, screen, fireEvent, act } from '@testing-library/react';

jest.useFakeTimers();

describe('NumSelector component', () => {
  const handleChange = jest.fn();
  const defaultValue = 5;
  const minValue = 0;
  const maxValue = 10;

  beforeEach(() => {
    handleChange.mockClear();
  });

  it('Should render with the given default value', () => {
    render(
      <NumSelector
        onChange={handleChange}
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
      />,
    );

    const valueElement = screen.getByText(defaultValue.toString());
    expect(valueElement).toBeInTheDocument();
  });

  it('Should increase value by 1 when up button is clicked', () => {
    render(
      <NumSelector
        onChange={handleChange}
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
      />,
    );

    const [upButton] = screen.getAllByRole('button');
    fireEvent.click(upButton);

    const valueElement = screen.getByText((defaultValue + 1).toString());
    expect(valueElement).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(defaultValue + 1);
  });

  it('Should decrease value by 1 when down button is clicked', () => {
    render(
      <NumSelector
        onChange={handleChange}
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
      />,
    );

    const [, downButton] = screen.getAllByRole('button');
    fireEvent.click(downButton);

    const valueElement = screen.getByText((defaultValue - 1).toString());
    expect(valueElement).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(defaultValue - 1);
  });

  it('Should not exceed the maxValue', () => {
    render(
      <NumSelector
        onChange={handleChange}
        defaultValue={maxValue}
        minValue={minValue}
        maxValue={maxValue}
      />,
    );

    const [upButton] = screen.getAllByRole('button');
    fireEvent.click(upButton);

    const valueElement = screen.getByText(maxValue.toString());
    expect(valueElement).toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalledWith(maxValue + 1);
  });

  it('Should not go below the minValue', () => {
    render(
      <NumSelector
        onChange={handleChange}
        defaultValue={minValue}
        minValue={minValue}
        maxValue={maxValue}
      />,
    );

    const [, downButton] = screen.getAllByRole('button');
    fireEvent.click(downButton);

    const valueElement = screen.getByText(minValue.toString());
    expect(valueElement).toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalledWith(minValue - 1);
  });

  it('Should handle long press on up button', async () => {
    render(
      <NumSelector
        onChange={handleChange}
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
      />,
    );

    const [upButton] = screen.getAllByRole('button');
    fireEvent.mouseDown(upButton);

    await act(async () => {
      jest.advanceTimersByTime(START_MOUSE_DOWN_TIMEOUT + MOUSE_DOWN_TIMEOUT);
    });

    expect(handleChange).toHaveBeenCalledWith(defaultValue + 1);

    await act(async () => {
      jest.advanceTimersByTime(MOUSE_DOWN_TIMEOUT * 3);
    });

    fireEvent.mouseUp(upButton);
    expect(handleChange).toHaveBeenCalledWith(defaultValue + 4);
  });

  it('Should handle long press on down button', async () => {
    render(
      <NumSelector
        onChange={handleChange}
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
      />,
    );

    const [, downButton] = screen.getAllByRole('button');
    fireEvent.mouseDown(downButton);

    await act(async () => {
      jest.advanceTimersByTime(START_MOUSE_DOWN_TIMEOUT + MOUSE_DOWN_TIMEOUT);
    });

    expect(handleChange).toHaveBeenCalledWith(defaultValue - 1);

    await act(async () => {
      jest.advanceTimersByTime(MOUSE_DOWN_TIMEOUT * 3);
    });

    fireEvent.mouseUp(downButton);
    expect(handleChange).toHaveBeenCalledWith(defaultValue - 4);
  });
});
