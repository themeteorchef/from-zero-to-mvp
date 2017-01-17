import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Events } from '../events.js';
import { Meetups } from '../../meetups/meetups.js';

Meteor.publish('events.index', () => Events.find({}, {
  fields: { name: 1, startDateTime: 1, location: 1 },
}));

Meteor.publish('events.view', (eventId) => {
  check(eventId, String);
  const event = Events.find({ _id: eventId, published: true });
  return [
    event,
    Meetups.find({ _id: event.fetch()[0].meetup }),
    Meteor.users.find({ _id: event.fetch()[0].rsvps }, { fields: { profile: 1 } }),
  ];
});

Meteor.publish('events.me', function eventsMePublication() {
  return Events.find({ createdBy: this.userId });
});

Meteor.publish('events.create', function eventsMePublication() {
  return Meetups.find({ owner: this.userId });
});

Meteor.publish('events.edit', function eventsMePublication(eventId) {
  check(eventId, Match.OneOf(String, null, undefined));

  const results = [
    Meetups.find({ owner: this.userId }),
  ];

  if (eventId) results.push(Events.find({ _id: eventId }));

  return results;
});
