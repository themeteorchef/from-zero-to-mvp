import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Events } from '../../api/events/events.js';
import { Meetups } from '../../api/meetups/meetups.js';
import CreateEvent from '../pages/CreateEditEvent.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('events.createEdit', params._id);

  if (subscription.ready()) {
    const event = Events.findOne(params._id);
    const meetups = Meetups.find({ owner: Meteor.userId() }).fetch();
    onData(null, { event, meetups });
  }
};

export default composeWithTracker(composer, Loading)(CreateEvent);
