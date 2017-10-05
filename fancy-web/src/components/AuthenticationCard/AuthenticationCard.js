import {
  string,
  func,
} from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

import './AuthenticationCard.scss';

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
  <div className='authentication-card__container'>
    <form onSubmit={handleSubmit}>
      <div className='authentication-card__text__title'>{title}</div>
      <div className='authentication-card__text__description'>{titleCaption}</div>
      <div>
        <button
          className='authentication-card__button__facebook'
          type='button'
          onClick={onFacebookClick}
        >
          {titleFacebook}
        </button>
      </div>
      <div>
        <button
          className='authentication-card__button__google-plus'
          type='button'
          onClick={onGooglePlusClick}
        >
          {titleGooglePlus}
        </button>
        <button
        className='authentication-card__button__twitter'
          type='button'
          onClick={onTwitterClick}
        >
          {titleTwitter}
        </button>
      </div>
      <div>
        <Field
          className='authentication-card__input'
          name='username'
          component='input'
          type='text'
          placeholder='Username'
        />
      </div>
      <div>
        <Field
        className='authentication-card__input'
          name='password'
          component='input'
          type='password'
          placeholder='Password'
        />
      </div>
      <div>
        <button
          className='authentication-card__button__authenticate'
          type='submit'
          disabled={pristine || submitting}
        >
          {authenticatedTitle}
        </button>
      </div>
      <div>
        <a className='authentication-card__text__recommendation'>
          More social networks
        </a>
      </div>
      <div className='authentication-card__text__description-small'>
        {descriptionLinkPage}
        <a
          className='authentication-card__text__recommendation'
          href={`/${linkPageUrl}`}
        >
          {titleLinkPage}
        </a>
      </div>
      <div>
        <div className='authentication-card__text__description-small'>
          Interested in selling? Get started
        </div>
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