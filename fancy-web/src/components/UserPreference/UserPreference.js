import {
  bool,
  func,
  object,
} from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

const UserPreference = ({
  // GraphQLs
  userPreference,
  // Form
  pristine, submitting,
  // Events
  handleSubmit, savePreference,
 }) => {
  if(!(userPreference.loading || userPreference.error)) {
    const {
      currencies,
      languages,
      timeZones,
    } = userPreference;
    return (
      <div>
        <div>
          Edit Preferences
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>Localization</div>
            <div>
              <div>Language</div>
              <Field name='localizationLanguage' component='select'>
                {
                  languages.map(({_id, value}) =>
                    <option key={_id} value={_id}>
                      {value}
                    </option>
                  )
                }
              </Field>
              <div>Interested in helping translate Fancy? <a href='/translate'>Let us know</a></div>
            </div>
            <div>
              <div>Time zone</div>
              <Field name='localizationTimeZone' component='select'>
                {
                  timeZones.map(({_id, value}) =>
                    <option key={_id} value={_id}>
                      {value}
                    </option>
                  )
                }
              </Field>
            </div>
            <div>
              <div>Currency</div>
              <Field name='localizationCurrency' component='select'>
                {
                  currencies.map(({_id, value}) =>
                    <option key={_id} value={_id}>
                      {value}
                    </option>
                  )
                }
              </Field>
            </div>
          </div>
          <div>
            <div>Privacy</div>
            <div>
              <div>Profile visibility</div>
              <div>Manage who can see your activity, things you fancy.
                your followers, people you follow or in anyone's search results.</div>
              <div>
                <Field
                  name='privacyProfileVisibility'
                  component='input'
                  type='radio'
                  value='Everyone'
                />
                Everyone
              </div>
              <div>
                <Field
                  name='privacyProfileVisibility'
                  component='input'
                  type='radio'
                  value='Private'
                />
                Private
              </div>
            </div>
            <div>
              <div>Messages</div>
              <div>Control who can send you messages</div>
              <div>
                <Field
                  name='privacyMessage'
                  component='input'
                  type='radio'
                  value='Everyone'
                />
                Everyone
              </div>
              <div>
                <Field
                  name='privacyMessage'
                  component='input'
                  type='radio'
                  value='Follower'
                />
                People you follow
              </div>
              <div>
                <Field
                  name='privacyMessage'
                  component='input'
                  type='radio'
                  value='None'
                />
                No one
              </div>
            </div>
            <div>
              <div>Recently viewd</div>
              <div>Manage your Fancy browing history</div>
              <button>Delete all items</button>
            </div>
          </div>
          <div>
            <div>Content</div>
            <div>
              <div>Category lists</div>
              <div>Automatically add Fancy'd items to the Category list</div>
              <div>
                <Field
                  name='contentCategoryList'
                  component='input'
                  type='radio'
                  value='Enable'
                />
                Enable
              </div>
              <div>
                <Field
                  name='contentCategoryList'
                  component='input'
                  type='radio'
                  value='Disable'
                />
                Disable
              </div>
            </div>
          </div>
          <button
            type='submit'
            disabled={pristine || submitting}
          >
            Save Preferences
          </button>
        </form>
      </div>
    )
  }
  else if(userPreference.error) {
    return <div>Please sign in to see your user preference</div>;
  }
  else {
    return <div>Loading...</div>;
  }
};

UserPreference.propTypes = {
  userPreference: object,
  pristine: bool,
  submitting: bool,
  handleSubmit: func,
  savePreference: func,
};

export default UserPreference;