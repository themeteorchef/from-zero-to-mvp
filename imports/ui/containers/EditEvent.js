import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Events } from '../../api/events/events.js';
import { Meetups } from '../../api/meetups/meetups.js';
import EditEvent from '../pages/EditEvent.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const eventId = params._id;
  const subscription = Meteor.subscribe('events.edit', eventId);

  if (subscription.ready()) {
    const event = Events.findOne(eventId);
    const meetups = Meetups.find({ owner: Meteor.userId() }).fetch();
    onData(null, { event, meetups });
  }
};

export default composeWithTracker(composer, Loading)(EditEvent);
