import React, { useEffect, useRef } from 'react';
import './style.scss';

interface DMSelectItemProps {
  itemValues: string[];
  selectedIndex?: number;
}

interface DMSelectProps {
  id: string;
  items: DMSelectItemProps;
  onChange: (index: number) => void;
  className?: string;
}

const DMSelect = ({ id, items, onChange, className = '' }: DMSelectProps) => {
  const selectRef = useRef<HTMLSelectElement>();
  const defaultValue = useRef(0);

  useEffect(() => {
    const selectedIndex = items?.selectedIndex;
    if (
      defaultValue.current !== selectedIndex &&
      selectedIndex < items?.itemValues?.length &&
      selectedIndex >= 0
    ) {
      defaultValue.current = selectedIndex;
      selectRef.current.selectedIndex = selectedIndex;
    }

    onChange(selectRef.current.selectedIndex);
  }, [items]);

  return (
    <select
      onChange={event => onChange(event.target.selectedIndex)}
      className={`dm-select ${className}`}
      ref={selectRef}
    >
      {items?.itemValues?.map((item, index) => (
        <option key={`DM_SELECT_${id}_${index}`}>{item}</option>
      ))}
    </select>
  );
};

export default DMSelect;
