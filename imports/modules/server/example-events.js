import moment from 'moment';

export default function (createdBy) {
  return [{
    published: true,
    createdBy,
    name: 'DevShop NYC',
    meetup: 'Meteor NYC',
    startDateTime: moment().add(3, 'days').format(),
    endDateTime: moment().add(3, 'days').add(2, 'hours').format(),
    location: {
      name: 'MongoDB',
      address: '229 W. 43rd St, 5th Floor',
      city: 'New York',
      state: 'NY',
    },
    description: 'Example description here.',
  }, {
    published: true,
    createdBy,
    meetup: 'PieFreaks',
    name: 'Pizza? Pizza!',
    startDateTime: moment().add(9, 'days').format(),
    endDateTime: moment().add(9, 'days').add(2, 'hours').format(),
    location: {
      name: 'Piece Brewery and Pizzeria',
      address: '1927 W North Ave',
      city: 'Chicago',
      state: 'IL',
    },
    description: 'Eat pizza. Talk about pizza. Dream about pizza. Have erotic...nevermind.',
  }, {
    published: false,
    createdBy,
    name: 'Stoicism Roundtable',
    meetup: 'Stoics Anonymous',
    startDateTime: moment().add(5, 'days').format(),
    endDateTime: moment().add(5, 'days').add(2, 'hours').format(),
    location: {
      name: 'Volumes Book Cafe',
      address: '1474 N. Milwaukee Ave.',
      city: 'Chicago',
      state: 'IL',
    },
    description: 'Discussion: Senena\'s Letters from a Stoic.',
  }];
}
