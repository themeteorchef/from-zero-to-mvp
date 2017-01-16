import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Meetups } from '../meetups.js';
import { Events } from '../../events/events.js';

Meteor.publish('meetups.index', () => Meetups.find());

Meteor.publish('meetups.me', function meetupsMePublication() {
  return Meetups.find({ owner: this.userId });
});

Meteor.publish('meetups.view', (meetupId) => {
  check(meetupId, String);

  const meetup = Meetups.find({ _id: meetupId });

  return [
    meetup,
    Events.find({ meetup: meetupId }),
    Meteor.users.find({ _id: meetup.fetch()[0].members }, { fields: { profile: 1 } }),
  ];
});
