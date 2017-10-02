import * as React from 'react';

const UserPreference = ({
  // userPreference: {
  //   email,
  //   preference: {
  //     localizationLanguage: {
  //       value: localizationValue,
  //     },
  //   },
  // },
  userPreference,
}) => (
  <div>
    <div>
      Edit Preferences
      {
        (!userPreference.loading && !userPreference.error) ?
        userPreference.me.email : null
      }
    </div>
    <div>
      <div>Localization</div>
      <div>
        <div>Language</div>
        <div>English</div>
        <div>Interested in helping translate Fancy? <a href='/translate'>Let us know</a></div>
      </div>
      <div>
        <div>Time zone</div>
        <div>(UTC+00.00) UTC</div>
      </div>
    </div>
    <div>
      <div>Privacy</div>
      <div>
        <div>Profile visibility</div>
        <div>Manage who can see your activity, things you fancy.
          your followers, people you follow or in anyone's search results.</div>
        <div>Everyone</div>
        <div>Private</div>
      </div>
      <div>
        <div>Messages</div>
        <div>Control who can send you messages</div>
        <div>Everyone</div>
        <div>People you follow</div>
        <div>No one</div>
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
        <div>Enable</div>
        <div>Disable</div>
      </div>
    </div>
  </div>
);

export default UserPreference;