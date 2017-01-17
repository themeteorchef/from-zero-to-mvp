/* eslint-disable new-cap */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Meetups } from './meetups';

Meteor.methods({
  'meetups.insert': function meetupsInsert(meetup) {
    check(meetup, {
      name: String,
      description: String,
      city: String,
      state: String,
    });

    const meetupToInsert = meetup;
    meetupToInsert.owner = this.userId;
    meetupToInsert.founded = (new Date()).toISOString();

    return Meetups.insert(meetupToInsert);
  },
  'meetups.update': function meetupsUpdate(meetup) {
    check(meetup, {
      _id: String,
      name: String,
      description: String,
      city: String,
      state: String,
    });

    const meetupToUpdate = meetup;
    const meetupId = meetupToUpdate._id;
    delete meetupToUpdate._id;

    return Meetups.update(meetupId, { $set: meetupToUpdate });
  },
  'meetups.remove': function meetupsRemove(meetupId) {
    check(meetupId, String);
    return Meetups.remove(meetupId);
  },
  'meetups.join': function meetupsJoin(meetupId) {
    check(meetupId, String);

    const isMember = Meetups.findOne({ members: { $in: [this.userId] } });

    if (!isMember) {
      Meetups.update(meetupId, {
        $addToSet: { members: this.userId },
      });
    } else {
      Meetups.update(meetupId, {
        $pull: { members: this.userId },
      });
    }
  },
});
