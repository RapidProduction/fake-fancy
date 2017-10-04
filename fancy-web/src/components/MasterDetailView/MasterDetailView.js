import { object } from 'prop-types';
import React from 'react';

const MasterDetailView = ({sidebar, detail}) => (
  <div>
    <div>
      <div>{sidebar}</div>
    </div>
    <div>
      <div>{detail}</div>
    </div>
  </div>
);

MasterDetailView.propTypes = {
  // detail is the component detail
  detail: object.isRequired,
  // sidebar is the component on the left
  sidebar: object.isRequired,
};

export default MasterDetailView;