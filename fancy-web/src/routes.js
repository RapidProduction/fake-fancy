import SignInPage from './components/Page/SignInPage';
import SignUpPage from './components/Page/SignUpPage';
import UserPreferencePage from './components/Page/UserPreferencePage';

const routes = [
  { path: '/',
    component: SignInPage,
  },
  { path: '/signup',
    component: SignUpPage,
  },
  { path: '/user',
    component: UserPreferencePage,
  }
]

export default routes;