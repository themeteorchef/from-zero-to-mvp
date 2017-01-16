/* eslint-disable new-cap */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events, EventsSchema } from './events';

Meteor.methods({
  createEvent(event) {
    check(event, EventsSchema);
    return Events.insert(event);
  },
  updateEvent(eventId, update) {
    check(event, EventsSchema);
    return Events.update(eventId, { $set: update });
  },
  deleteEvent(eventId) {
    check(eventId, String);
    return Events.remove(eventId);
  },
});
