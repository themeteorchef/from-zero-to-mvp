import { Meteor } from 'meteor/meteor';
import { Meetups } from '../../meetups/meetups.js';
import { Events } from '../../events/events.js';

Meteor.publish('pages.index', () => [
  Meetups.find({}, {
    fields: {
      name: 1,
      description: 1,
      city: 1,
      state: 1,
    },
    sort: {
      founded: -1,
    },
    limit: 4,
  }),
  Events.find({}, {
    fields: {
      name: 1,
      startDateTime: 1,
      location: 1,
    },
    sort: {
      startDateTime: 1,
    },
    limit: 5,
  }),
]);
