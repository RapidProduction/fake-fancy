import {
  string,
  func,
} from 'prop-types';
import * as React from 'react';

const AuthenticationCard = ({
  // Props
  authenticatedTitle,
  title,
  titleCaption,
  titleFacebook,
  titleGooglePlus,
  titleTwitter,
  // Handlers
  onFacebookClick,
  onGooglePlusClick,
  onTwitterClick,
  onAuthenticate,
}) => (
  <div>
    <div>{title}</div>
    <div>{titleCaption}</div>
    <div>
      <button onClick={onFacebookClick}>{titleFacebook}</button>
    </div>
    <div>
      <button onClick={onGooglePlusClick}>{titleGooglePlus}</button>
      <button onClick={onTwitterClick}>{titleTwitter}</button>
    </div>
    <div>
      <input type='text' value='Username' />
    </div>
    <div>
      <input type='password' value='Password' />
    </div>
    <div>
      <button onClick={onAuthenticate}>{authenticatedTitle}</button>
    </div>
    <div>
      <a>More social networks</a>
    </div>
    <div>
      New to Fancy? <a href='/signup'>Sign up now</a>
    </div>
    <div>
      <div>Interested in selling? Get started</div>
      <button>Get started</button>
    </div>
  </div>
);

AuthenticationCard.propTypes = {
  // Props
  authenticatedTitle: string,
  title: string,
  titleCaption: string,
  titleFacebook: string,
  titleGooglePlus: string,
  titleTwitter: string,
  // Handlers
  onFacebookClick: func,
  onGooglePlusClick: func,
  onTwitterClick: func,
  onAuthenticate: func,
};

export default AuthenticationCard;