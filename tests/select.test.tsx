import DMSelect from '@elements/select';
import { render, screen, fireEvent } from '@testing-library/react';

describe('DMSelect component', () => {
  const handleChange = jest.fn();
  const id = 'test-select';
  const items = {
    itemValues: ['Option 1', 'Option 2', 'Option 3'],
    selectedIndex: 1,
  };

  beforeEach(() => {
    handleChange.mockClear();
  });

  it('Should render with the given items', () => {
    render(<DMSelect id={id} items={items} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass('dm-select');

    items.itemValues.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('Should set the default selected index', () => {
    render(<DMSelect id={id} items={items} onChange={handleChange} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.selectedIndex).toBe(items.selectedIndex);
  });

  it('Should call onChange with the correct index when selection changes', () => {
    render(<DMSelect id={id} items={items} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Option 2' } });

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenLastCalledWith(items.selectedIndex);
  });

  it('Should apply additional class name', () => {
    const customClassName = 'custom-class';
    render(
      <DMSelect
        id={id}
        items={items}
        onChange={handleChange}
        className={customClassName}
      />,
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('dm-select');
    expect(select).toHaveClass(customClassName);
  });

  it('Should update selectedIndex when items prop changes', () => {
    const { rerender } = render(
      <DMSelect id={id} items={items} onChange={handleChange} />,
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.selectedIndex).toBe(items.selectedIndex);

    const newItems = {
      ...items,
      selectedIndex: 2,
    };

    rerender(<DMSelect id={id} items={newItems} onChange={handleChange} />);
    expect(select.selectedIndex).toBe(newItems.selectedIndex);
  });
});
