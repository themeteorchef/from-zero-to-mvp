import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Jumbotron, Panel, Alert } from 'react-bootstrap';
import moment from 'moment';

const buildLocation = ({ address, city, state }) => {
  return `${address}, ${city}, ${state}`;
};

const ViewEvent = ({ event, rsvps, meetup, isOwner }) => {
  const location = buildLocation(event.location);
  const startDateDay = moment(event.startDateTime).format('MMMM Do, YYYY');
  const endDateDay = moment(event.endDateTime).format('MMMM Do, YYYY');
  const sameDay = startDateDay === endDateDay;
  const dateTime = sameDay ?
  `${moment(event.startDateTime).format('MMMM Do, YYYY [at] hh:mm a')} to ${moment(event.endDateTime).format('hh:mm a')}` :
  `${moment(event.startDateTime).format('MMMM Do, YYYY [at] hh:mm a')} to ${moment(event.endDateTime).format('MMMM Do, YYYY [at] hh:mm a')}`;

  return (
    <div className="ViewEvent">
      <Row>
        <Col xs={ 12 } sm={ 10 } smOffset={ 1 } md={ 8 } mdOffset={ 2 } lg={ 6 } lgOffset={ 3 }>
          <Jumbotron>
            { isOwner ? <Link to={`/events/${event._id}/edit`}>Edit</Link> : '' }
            <h4 className="meetup-name">
              <Link to={`/meetups/${meetup._id}`}>{ meetup.name }</Link> presents...
            </h4>
            <h3>{ event.name }</h3>
            <h4>
              <i className="fa fa-map-marker" />
              <a href={`http://maps.google.com/?q=${location}`} target="_blank">
                { event.location.name }
              </a>
            </h4>
            <h4>{ location }</h4>
            <h4>{ dateTime }</h4>
          </Jumbotron>
          <p>{ event.description }</p>

          <h4 className="page-header">RSVPs ({rsvps.length})</h4>
          {rsvps.length > 0 ? rsvps.map(rsvp => (
            <Panel>{ rsvp.profile.name.first } { rsvp.profile.name.last }</Panel>
          )) : <Alert>{ 'No one has RSVP\'d yet. Don\'t forget to promote!' }</Alert> }
        </Col>
      </Row>
    </div>
  );
};

ViewEvent.propTypes = {
  event: React.PropTypes.object,
  rsvps: React.PropTypes.array,
  meetup: React.PropTypes.object,
  isOwner: React.PropTypes.bool,
};

export default ViewEvent;
