import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Meetups } from '../../api/meetups/meetups.js';
import CreateEvent from '../pages/CreateEvent.js';
import Loading from '../components/Loading.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('events.create');

  if (subscription.ready()) {
    const meetups = Meetups.find({ owner: Meteor.userId() }).fetch();
    onData(null, { meetups });
  }
};

export default composeWithTracker(composer, Loading)(CreateEvent);
