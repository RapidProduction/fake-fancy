const AUTHENTICATION_TOKEN_KEY = 'fancy-authentication-token';

export const setAuthenticationToken = (token) => {
  localStorage.setItem(AUTHENTICATION_TOKEN_KEY, token);
}

export const getAuthenticationToken = () => {
  return localStorage.getItem(AUTHENTICATION_TOKEN_KEY);
}