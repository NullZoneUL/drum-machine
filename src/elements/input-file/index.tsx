import React, { useEffect, useRef } from 'react';
import './style.scss';

interface InputFileProps {
  text: string;
  accept: string;
  callback: (file: File) => void;
  className?: string;
}

const InputFile = ({
  text,
  accept,
  callback,
  className = '',
}: InputFileProps) => {
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current.addEventListener('change', () => {
      const files = inputRef.current.files;
      files.length > 0 && callback(files[0]);
    });
  }, []);

  return (
    <button className={`dm-input-file ${className}`}>
      <label htmlFor="files">{text}</label>
      <input id="files" type="file" accept={accept} ref={inputRef} />
    </button>
  );
};

export default InputFile;
