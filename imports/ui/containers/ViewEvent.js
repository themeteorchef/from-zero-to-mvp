import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Events } from '../../api/events/events.js';
import { Meetups } from '../../api/meetups/meetups.js';
import ViewEvent from '../pages/ViewEvent.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const eventId = params._id;
  const subscription = Meteor.subscribe('events.view', eventId);

  if (subscription.ready()) {
    const owner = Meteor.userId();
    const event = Events.findOne(eventId);
    const rsvps = Meteor.users.find({ _id: { $in: event.rsvps } }).fetch();
    const meetup = Meetups.findOne({ _id: event.meetup });
    const isOwner = event.createdBy === owner;

    onData(null, { event, rsvps, meetup, isOwner });
  }
};

export default composeWithTracker(composer, Loading)(ViewEvent);
