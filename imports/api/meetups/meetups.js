import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Meetups = new Mongo.Collection('Meetups');

Meetups.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Meetups.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const MeetupsSchema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the owner of this meetup.',
  },
  name: {
    type: String,
    label: 'The name of this meetup.',
  },
  description: {
    type: String,
    label: 'The description of this meetup.',
  },
  city: {
    type: String,
    label: 'The city where this meetup takes place.',
  },
  state: {
    type: String,
    label: 'The state where this meetup takes place.',
  },
  founded: {
    type: String,
    label: 'The date this meetup was founded.',
  },
  members: {
    type: [String],
    label: 'The IDs of members who have joined this meetup.',
    defaultValue: [],
  },
});

Meetups.attachSchema(MeetupsSchema);
