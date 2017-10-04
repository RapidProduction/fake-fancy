import React from 'react';
import {
  compose,
  withProps,
} from 'recompose';

import MasterDetailView from '../components/MasterDetailView/MasterDetailView';
import UserPreferencePage from '../components/Page/UserPreferencePage';
import FancyMenuList from './fancyMenuList';

export default compose(
  withProps({
    sidebar: <FancyMenuList />,
    detail: <UserPreferencePage />,
  }),
)(MasterDetailView);