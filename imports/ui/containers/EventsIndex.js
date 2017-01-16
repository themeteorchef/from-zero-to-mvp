import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Events } from '../../api/events/events.js';
import EventsIndex from '../pages/EventsIndex.js';
import Loading from '../components/Loading.js';
import callToAction from '../../modules/call-to-action.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('events.index');

  if (subscription.ready()) {
    const upcomingEvents = Events.find({}, { sort: { startEndDate: -1 }, limit: 3 }).fetch();
    const popularEvents = Events.find({}, { sort: { rsvps: -1 }, limit: 3 }).fetch();
    const allEvents = Events.find({}, { sort: { name: 1 } }).fetch();
    const cta = callToAction(Meteor.userId(), 'event');

    onData(null, { cta, upcomingEvents, popularEvents, allEvents });
  }
};

export default composeWithTracker(composer, Loading)(EventsIndex);
