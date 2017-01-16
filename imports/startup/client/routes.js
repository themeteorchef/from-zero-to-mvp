/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Index from '../../ui/containers/Index.js';
import MeetupsIndex from '../../ui/containers/MeetupsIndex.js';
import EventsIndex from '../../ui/containers/EventsIndex.js';
import MyMeetups from '../../ui/containers/MyMeetups.js';
import MyEvents from '../../ui/containers/MyEvents.js';
import CreateEvent from '../../ui/containers/CreateEvent.js';
// import CreateMeetup from '../../ui/pages/CreateMeetup.js';
import ViewEvent from '../../ui/containers/ViewEvent.js';
import ViewMeetup from '../../ui/containers/ViewMeetup.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route path="/meetups">
          <IndexRoute name="meetups" component={ MeetupsIndex } />
          { /* <Route path="create" name="createMeetup" component={ CreateMeetup } /> */ }
          <Route path=":_id" name="viewMeetup" component={ ViewMeetup } />
        </Route>
        <Route path="/events">
          <IndexRoute name="events" component={ EventsIndex } />
          <Route path="create" name="createEvent" component={ CreateEvent } />
          <Route path=":_id" name="viewEvent" component={ ViewEvent } />
        </Route>
        <Route path="/me">
          <Route name="myEvents" path="events" component={ MyEvents } />
          <Route name="myMeetups" path="meetups" component={ MyMeetups } />
        </Route>
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
