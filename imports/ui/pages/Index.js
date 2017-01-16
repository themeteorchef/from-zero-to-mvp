import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import MeetupsList from '../components/MeetupsList.js';
import EventsList from '../components/EventsList.js';

const Index = ({ meetups, events, cta }) => (
  <div className="Index">
    <Jumbotron>
      <h3>Start the next big movement.</h3>
      <p>Gather brings together like minds around powerful ideas.</p>
      <Link className="btn btn-success" to={ cta.href }>
        { cta.label }
      </Link>
    </Jumbotron>
    <h4 className="page-header">New Meetups</h4>
    <MeetupsList meetups={meetups} />
    <h4 className="page-header">Upcoming Events</h4>
    <EventsList events={events} />
  </div>
);

Index.propTypes = {
  meetups: React.PropTypes.array,
  events: React.PropTypes.array,
  cta: React.PropTypes.object,
};

export default Index;
