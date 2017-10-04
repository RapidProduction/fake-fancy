import {
  string,
  func,
} from 'prop-types';
import * as React from 'react';
import { Field } from 'redux-form';

const AuthenticationCard = ({
  // Props
  authenticatedTitle,
  title,
  titleCaption,
  titleFacebook,
  titleGooglePlus,
  titleTwitter,
  // Form
  pristine, submitting,
  // Events
  onFacebookClick,
  onGooglePlusClick,
  onTwitterClick,
  handleSubmit,
}) => (
  <div>
    <form onSubmit={handleSubmit}>
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
        <Field
          name='username'
          component='input'
          type='text'
          placeholder='Username'
        />
      </div>
      <div>
        <Field
          name='password'
          component='input'
          type='password'
          placeholder='Password'
        />
      </div>
      <div>
        <button type='submit' disabled={pristine || submitting}>
          {authenticatedTitle}
        </button>
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
    </form>
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
  handleSubmit: func,
};

export default AuthenticationCard;