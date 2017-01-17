import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Jumbotron, Panel, Alert, Button } from 'react-bootstrap';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

const buildLocation = ({ address, city, state }) => {
  return `${address}, ${city}, ${state}`;
};

const toggleRSVP = (eventId) => {
  Meteor.call('events.rsvp', eventId, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('RSVP updated!', 'success');
    }
  });
};

const ViewEvent = ({ event, rsvps, meetup, isOwner, isAttending }) => {
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
            { isAttending ? <Button
              onClick={() => { toggleRSVP(event._id); }}
              bsStyle="success"
            >
              <i className="fa fa-check"></i> You're Going!
            </Button> : <Button
              bsStyle="warning"
              onClick={() => { toggleRSVP(event._id); }}
            >RSVP to This</Button> }
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
  isAttending: React.PropTypes.bool,
};

export default ViewEvent;
