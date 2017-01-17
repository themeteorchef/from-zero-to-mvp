/* eslint-disable new-cap */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from './events';

Meteor.methods({
  'events.insert': function eventsInsert(event) {
    check(event, {
      published: Boolean,
      meetup: String,
      name: String,
      description: String,
      startDateTime: String,
      endDateTime: String,
      location: Object,
    });

    const eventToInsert = event;
    eventToInsert.createdBy = this.userId;

    return Events.insert(eventToInsert);
  },
  'events.update': function eventsUpdate(event) {
    check(event, {
      _id: String,
      published: Boolean,
      meetup: String,
      name: String,
      description: String,
      startDateTime: String,
      endDateTime: String,
      location: Object,
    });

    const eventToUpdate = event;
    const eventId = eventToUpdate._id;
    delete eventToUpdate._id;

    return Events.update(eventId, { $set: eventToUpdate });
  },
  'events.remove': function eventsRemove(eventId) {
    check(eventId, String);
    return Events.remove(eventId);
  },
  'events.rsvp': function eventsRSVP(eventId) {
    check(eventId, String);

    const isAttending = Events.findOne({ rsvps: { $in: [this.userId] } });

    if (!isAttending) {
      Events.update(eventId, {
        $addToSet: { rsvps: this.userId },
      });
    } else {
      Events.update(eventId, {
        $pull: { rsvps: this.userId },
      });
    }
  },
});
