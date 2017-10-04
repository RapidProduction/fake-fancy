import {
  compose,
  withProps,
} from 'recompose';

import VerticalButtonList from '../components/VerticalButtonList/VerticalButtonList';

const buttonDescriptor = [
  {
    title: 'Edit Profile',
    path: '/user/edit-profile',
  },
  {
    title: 'Preferences',
    path: '/user',
  },
  {
    title: 'Password',
    path: '/user/password',
  },
  {
    title: 'Notifications',
    path: '/user/notifications',
  },
  {
    title: 'Connected Accounts',
    path: '/user/connected-account',
  },
  {
    title: 'Orders',
    path: '/order',
  },
  {
    title: 'Payment',
    path: '/Payment',
  },
  {
    title: 'Shipping',
    path: '/shipping',
  },
  {
    title: 'Credit & Referrals',
    path: '/credit-referrals',
  },
];

export default compose(
  withProps({ descriptors: buttonDescriptor }),
)(VerticalButtonList);