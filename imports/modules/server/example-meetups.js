export default function (owner) {
  return [{
    owner,
    name: 'PieFreaks',
    description: 'We love pizza...and it\'s kind of becoming a problem.',
    city: 'Chicago',
    state: 'IL',
    founded: (new Date()).toISOString(),
  }, {
    owner,
    name: 'Meteor NYC',
    description: 'Meteor talks, hack nights, and more.',
    city: 'New York',
    state: 'NY',
    founded: (new Date()).toISOString(),
  }, {
    owner,
    name: 'Stoics Anonymous',
    description: 'Ambition means tying your well-being to what other people say or do. Self-indulgence means tying it to the things that happen to you. Sanity means tying it to your own actions.',
    city: 'Chicago',
    state: 'IL',
    founded: (new Date()).toISOString(),
  }];
}
