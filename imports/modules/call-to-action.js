const meetupsCallToAction = (user, type) => (
user ? {
  href: type === 'meetup' ? '/meetups/create' : '/events/create',
  label: type === 'meetup' ? 'Create a Meetup' : 'Create an Event',
} : {
  href: '/signup',
  label: 'Join Gather',
});

export default meetupsCallToAction;
