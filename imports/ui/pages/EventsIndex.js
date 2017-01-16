import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import EventsList from '../components/EventsList.js';

const EventsIndex = ({ cta, upcomingEvents, popularEvents, allEvents }) => (
  <div className="MeetupsIndex">
    <Jumbotron>
      <h3>These folks are gathering soon.</h3>
      <p>{ allEvents.length } upcoming events on Gather. Get out there!</p>
      <Link className="btn btn-success" to={ cta.href }>{ cta.label }</Link>
    </Jumbotron>

    <h4 className="page-header">Upcoming Events</h4>
    <EventsList events={ upcomingEvents } />

    <h4 className="page-header">Popular Events</h4>
    <EventsList events={ popularEvents } />

    <h4 className="page-header">All Events</h4>
    <EventsList events={ allEvents } />
  </div>
);

EventsIndex.propTypes = {
  cta: React.PropTypes.object,
  upcomingEvents: React.PropTypes.array,
  popularEvents: React.PropTypes.array,
  allEvents: React.PropTypes.array,
};

export default EventsIndex;
