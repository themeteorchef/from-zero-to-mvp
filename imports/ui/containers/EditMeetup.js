import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Meetups } from '../../api/meetups/meetups.js';
import EditMeetup from '../pages/EditMeetup.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const meetupId = params._id;
  const subscription = Meteor.subscribe('meetups.edit', meetupId);

  if (subscription.ready()) {
    const meetup = Meetups.findOne(meetupId);
    onData(null, { meetup });
  }
};

export default composeWithTracker(composer, Loading)(EditMeetup);
