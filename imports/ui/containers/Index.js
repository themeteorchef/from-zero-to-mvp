import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Meetups } from '../../api/meetups/meetups.js';
import { Events } from '../../api/events/events.js';
import Index from '../pages/Index.js';
import Loading from '../components/Loading.js';
import callToAction from '../../modules/call-to-action.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('pages.index');

  if (subscription.ready()) {
    const meetups = Meetups.find().fetch();
    const events = Events.find().fetch();
    const cta = callToAction(Meteor.userId(), 'meetup');

    onData(null, { meetups, events, cta });
  }
};

export default composeWithTracker(composer, Loading)(Index);
