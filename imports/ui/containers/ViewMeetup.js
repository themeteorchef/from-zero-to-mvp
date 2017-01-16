import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Meetups } from '../../api/meetups/meetups.js';
import { Events } from '../../api/events/events.js';
import ViewMeetup from '../pages/ViewMeetup.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const meetupId = params._id;
  const subscription = Meteor.subscribe('meetups.view', meetupId);

  if (subscription.ready()) {
    const meetup = Meetups.findOne(meetupId);
    const events = Events.find({ meetup: meetupId }).fetch();
    const members = Meteor.users.find({ _id: { $in: meetup.members } }).fetch();
    onData(null, { meetup, events, members });
  }
};

export default composeWithTracker(composer, Loading)(ViewMeetup);
