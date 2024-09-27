import InputFile from '@elements/input-file';
import { render, screen, fireEvent } from '@testing-library/react';

describe('InputFile component', () => {
  const text = 'Upload File';
  const accept = '.png, .jpg';
  const handleFileChange = jest.fn();

  it('Should render the button with the given text', () => {
    render(
      <InputFile text={text} accept={accept} callback={handleFileChange} />,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(text);
  });

  it('Should apply the given className to the button', () => {
    const customClass = 'custom-class';
    render(
      <InputFile
        text={text}
        accept={accept}
        callback={handleFileChange}
        className={customClass}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('dm-input-file');
    expect(button).toHaveClass(customClass);
  });

  it('Should call the callback with the selected file when a file is chosen', () => {
    render(
      <InputFile text={text} accept={accept} callback={handleFileChange} />,
    );

    const input = screen.getByLabelText(text) as HTMLInputElement;
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    fireEvent.change(input, { target: { files: [file] } });

    expect(handleFileChange).toHaveBeenCalledTimes(1);
    expect(handleFileChange).toHaveBeenCalledWith(file);
  });
});
