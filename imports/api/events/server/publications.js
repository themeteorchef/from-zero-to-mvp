import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from '../events.js';
import { Meetups } from '../../meetups/meetups.js';

Meteor.publish('events.index', () => Events.find({}, {
  fields: { name: 1, startDateTime: 1, location: 1 },
}));

Meteor.publish('events.view', (eventId) => {
  check(eventId, String);
  const event = Events.find({ _id: eventId });
  return [
    event,
    Meteor.users.find({ _id: event.fetch()[0].rsvps }, { fields: { profile: 1 } }),
  ];
});

Meteor.publish('events.me', function eventsMePublication() {
  return Events.find({ createdBy: this.userId });
});

Meteor.publish('events.create', function eventsMePublication() {
  return Meetups.find({ owner: this.userId });
});
