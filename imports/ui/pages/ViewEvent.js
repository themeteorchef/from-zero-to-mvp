import React from 'react';
import { Row, Col, Jumbotron, Panel, Alert } from 'react-bootstrap';

const buildLocation = ({ address, city, state }) => {
  return `${address}, ${city}, ${state}`;
};

const ViewEvent = ({ event, rsvps }) => {
  const location = buildLocation(event.location);
  return (
    <div className="ViewEvent">
      <Row>
        <Col xs={ 12 } sm={ 10 } smOffset={ 1 } md={ 8 } mdOffset={ 2 } md={ 6 } mdOffset={ 3 }>
          <Jumbotron>
            <h3>{ event.name }</h3>
            <h4>
              <i className="fa fa-map-marker" />
              <a href={`http://maps.google.com/?q=${location}`} target="_blank">
                { event.location.name }
              </a>
            </h4>
            <h4>{ location }</h4>
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
};

export default ViewEvent;
