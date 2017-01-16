import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Events } from '../../api/events/events.js';
import MyEvents from '../pages/MyEvents.js';
import Loading from '../components/Loading.js';
import callToAction from '../../modules/call-to-action.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('events.me');

  if (subscription.ready()) {
    const unpublishedEvents = Events.find({ createdBy: Meteor.userId(), published: false }).fetch();
    const publishedEvents = Events.find({ createdBy: Meteor.userId(), published: true }).fetch();
    const cta = callToAction(Meteor.userId(), 'event');

    onData(null, { cta, unpublishedEvents, publishedEvents });
  }
};

export default composeWithTracker(composer, Loading)(MyEvents);
