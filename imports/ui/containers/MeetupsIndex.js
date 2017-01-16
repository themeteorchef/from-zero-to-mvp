import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Meetups } from '../../api/meetups/meetups.js';
import MeetupsIndex from '../pages/MeetupsIndex.js';
import Loading from '../components/Loading.js';
import callToAction from '../../modules/call-to-action.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('meetups.index');

  if (subscription.ready()) {
    const newMeetups = Meetups.find({}, { sort: { founded: -1 }, limit: 3 }).fetch();
    const popularMeetups = Meetups.find({}, { sort: { members: -1 }, limit: 3 }).fetch();
    const allMeetups = Meetups.find({}, { sort: { name: 1 } }).fetch();
    const cta = callToAction(Meteor.userId(), 'meetup');

    onData(null, { cta, newMeetups, popularMeetups, allMeetups });
  }
};

export default composeWithTracker(composer, Loading)(MeetupsIndex);
