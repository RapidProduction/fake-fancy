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
  titleLinkPage,
  descriptionLinkPage,
  linkPageUrl,
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
        <button type='button' onClick={onFacebookClick}>{titleFacebook}</button>
      </div>
      <div>
        <button type='button' onClick={onGooglePlusClick}>{titleGooglePlus}</button>
        <button type='button' onClick={onTwitterClick}>{titleTwitter}</button>
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
        {descriptionLinkPage}<a href={`/${linkPageUrl}`}>{titleLinkPage}</a>
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
  titleLinkPage: string,
  descriptionLinkPage: string,
  linkPageUrl: string,
  // Handlers
  onFacebookClick: func,
  onGooglePlusClick: func,
  onTwitterClick: func,
  handleSubmit: func,
};

export default AuthenticationCard;