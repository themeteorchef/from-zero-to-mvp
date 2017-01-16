import React from 'react';
import { Link } from 'react-router';
import { Jumbotron, Alert } from 'react-bootstrap';
import EventsList from '../components/EventsList.js';

const MyEvents = ({ cta, unpublishedEvents, publishedEvents }) => (
  <div className="MyEvents">
    <Jumbotron>
      <h3>Your events.</h3>
      <p>All of the events that you've created.</p>
      <Link className="btn btn-success" to={ cta.href }>{ cta.label }</Link>
    </Jumbotron>

    <h4 className="page-header">Unpublished Events</h4>
    { unpublishedEvents.length > 0 ?
      <EventsList events={ unpublishedEvents } /> :
      <Alert>You don't have any unpublished events yet.</Alert> }

    <h4 className="page-header">Published Events</h4>
    { publishedEvents.length > 0 ?
      <EventsList events={ publishedEvents } /> :
      <Alert>You don't have any published events yet.</Alert> }
  </div>
);

MyEvents.propTypes = {
  cta: React.PropTypes.object,
  unpublishedEvents: React.PropTypes.array,
  publishedEvents: React.PropTypes.array,
};

export default MyEvents;
