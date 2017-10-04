import {
  string,
  func,
} from 'prop-types';
import React from 'react';

const TopPanel = ({
  // Props
  title,
  authenticatedButtonTitle,
  // Events
  onAuthenticate,
 }) => (
  <div>
    <div>Fancy</div>
    <div>You</div>
    <button onClick={onAuthenticate}>{authenticatedButtonTitle}</button>
  </div>
);

TopPanel.propTypes = {
  title: string,
  authenticatedButtonTitle: string,
  onAuthenticate: func,
};

export default TopPanel;