import { array } from 'prop-types';
import React from 'react';

const VerticalButtonList = ({ descriptors }) => (
  <div>
    {
      descriptors.map((descriptor) =>
        <button key={descriptor.title}>{descriptor.title}</button>
      )
    }
  </div>
);

VerticalButtonList.propTypes = {
  descriptors: array,
};

export default VerticalButtonList;