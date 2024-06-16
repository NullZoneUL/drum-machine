import React, { useEffect, useRef } from 'react';
import './style.scss';

interface DMSelectItemProps {
  name: string;
  selected?: boolean;
}

interface DMSelectProps {
  id: string;
  items: DMSelectItemProps[];
  onChange: (index: number) => void;
  className?: string;
}

const DMSelect = ({ id, items, onChange, className = '' }: DMSelectProps) => {
  const selectRef = useRef<HTMLSelectElement>();

  useEffect(() => {
    onChange(selectRef.current.selectedIndex);
  }, [items]);

  return (
    <select
      onChange={event => onChange(event.target.selectedIndex)}
      className={`dm-select ${className}`}
      ref={selectRef}
    >
      {items?.map((item, index) => (
        <option key={`DM_SELECT_${id}_${index}`} selected={item.selected}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default DMSelect;
