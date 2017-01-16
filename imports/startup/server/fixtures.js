import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { Events } from '../../api/events/events.js';
import { Meetups } from '../../api/meetups/meetups.js';
import exampleEvents from '../../modules/server/example-events.js';
import exampleMeetups from '../../modules/server/example-meetups.js';

if (!Meteor.isProduction) {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: { first: 'Carl', last: 'Winslow' },
    },
    roles: ['admin'],
  }];

  users.forEach(({ email, password, profile, roles }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile });
      Roles.addUsersToRoles(userId, roles);
    }
  });

  const userId = Meteor.users.findOne({ 'emails.address': 'admin@admin.com' })._id;

  if (userId) {
    const meetups = exampleMeetups(userId);
    meetups.forEach((meetup) => {
      const meetupExists = Meetups.findOne({ name: meetup.name });

      if (!meetupExists) {
        const meetupId = Meetups.insert(meetup);
        const events = exampleEvents(userId);
        const meetupEvents = _.filter(events, event => event.meetup === meetup.name);

        meetupEvents.forEach((event) => {
          const eventToInsert = event;
          const eventExists = Events.findOne({ name: eventToInsert.name });

          eventToInsert.meetup = meetupId;
          if (!eventExists) Events.insert(eventToInsert);
        });
      }
    });
  }
}
