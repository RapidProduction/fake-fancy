import SignInPage from './components/Page/SignInPage';
import SignUpPage from './components/Page/SignUpPage';
import MenuListContainer from './composed/menuListContainer';

const routes = [
  { path: '/',
    component: SignInPage,
  },
  { path: '/signup',
    component: SignUpPage,
  },
  { path: '/user',
    component: MenuListContainer,
  }
]

export default routes;