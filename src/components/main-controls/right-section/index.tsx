import React from 'react';
import DMSelect from '@elements/select';
import { numPages } from '@/utils/pages';
import './style.scss';

const MainControlsRightSection = () => {
  return (
    <div className="main-controls-right-section">
      <DMSelect
        id="MAIN_PAGE_SELECTOR"
        items={numPages}
        onChange={(index: number) => console.log(`Todo!!! Index: ${index}`)}
        className="main-controls-num-pages"
      />
    </div>
  );
};

export default MainControlsRightSection;
