import React from 'react';
import { Row, Col, Jumbotron, Panel, Alert } from 'react-bootstrap';
import EventsList from '../components/EventsList.js';

const buildLocation = ({ city, state }) => `${city}, ${state}`;

const ViewMeetup = ({ meetup, events, members }) => {
  const location = buildLocation(meetup);
  return (
    <div className="ViewMeetup">
      <Row>
        <Col xs={ 12 } sm={ 10 } smOffset={ 1 } md={ 8 } mdOffset={ 2 } md={ 6 } mdOffset={ 3 }>
          <Jumbotron>
            <h3>{ meetup.name }</h3>
            <h4>
              <i className="fa fa-map-marker" />
              <a href={`http://maps.google.com/?q=${location}`} target="_blank">{ location }</a>
            </h4>
          </Jumbotron>
          <p>{ meetup.description }</p>
          <h4 className="page-header">Upcoming Events ({events.length})</h4>
          <EventsList events={ events } />

          <h4 className="page-header">Members ({members.length})</h4>
          {members.length > 0 ? members.map(member => (
            <Panel>{ member.profile.name.first } { member.profile.name.last }</Panel>
          )) : <Alert>{ 'No one has RSVP\'d yet. Don\'t forget to promote!' }</Alert> }
        </Col>
      </Row>
    </div>
  );
};

ViewMeetup.propTypes = {
  meetup: React.PropTypes.object,
  events: React.PropTypes.array,
  members: React.PropTypes.array,
};

export default ViewMeetup;
