import React from 'react';
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
  return (
    <select
      onChange={event => onChange(event.target.selectedIndex)}
      className={`dm-select ${className}`}
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
