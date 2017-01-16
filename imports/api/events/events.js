import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Events = new Mongo.Collection('Events');

Events.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Events.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const EventsSchema = new SimpleSchema({
  published: {
    type: Boolean,
    label: 'Is this event visible to the public?',
  },
  meetup: {
    type: String,
    label: 'The ID of the meetup this event belongs to.',
  },
  createdBy: {
    type: String,
    label: 'The ID of the user who created this event.',
  },
  name: {
    type: String,
    label: 'The name of the event.',
  },
  startDateTime: {
    type: String,
    label: 'The ISO8601 timestamp for the start date and time of this event.',
  },
  endDateTime: {
    type: String,
    label: 'The ISO8601 timestamp for the end date and time of this event.',
  },
  'location.name': {
    type: String,
    label: 'The name of the location where this event is taking place.',
  },
  'location.address': {
    type: String,
    label: 'The street address of the location where this event is taking place.',
  },
  'location.city': {
    type: String,
    label: 'The city of the location where this event is taking place.',
  },
  'location.state': {
    type: String,
    label: 'The state of the location where this event is taking place.',
  },
  description: {
    type: String,
    label: 'The description of the event.',
  },
  createdAt: {
    type: String,
    label: 'The ISO8601 timestamp for the date this event was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The ISO8601 timestamp for the date this event was update.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  rsvps: {
    type: [String],
    label: 'The IDs of the users who have RSVPd to this event.',
    defaultValue: [],
  },
});

Events.attachSchema(EventsSchema);
