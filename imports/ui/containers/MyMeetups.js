import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Meetups } from '../../api/meetups/meetups.js';
import MyMeetups from '../pages/MyMeetups.js';
import Loading from '../components/Loading.js';
import callToAction from '../../modules/call-to-action.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('meetups.me');

  if (subscription.ready()) {
    const meetups = Meetups.find({ owner: Meteor.userId() }).fetch();
    const cta = callToAction(Meteor.userId(), 'meetup');

    onData(null, { cta, meetups });
  }
};

export default composeWithTracker(composer, Loading)(MyMeetups);
