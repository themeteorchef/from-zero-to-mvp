import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Jumbotron, Panel, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import EventsList from '../components/EventsList.js';

const buildLocation = ({ city, state }) => `${city}, ${state}`;

const toggleMembership = (meetupId) => {
  Meteor.call('meetups.join', meetupId, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Membership updated!', 'success');
    }
  });
};

const ViewMeetup = ({ meetup, events, members, isOwner, isMember }) => {
  const location = buildLocation(meetup);
  return (
    <div className="ViewMeetup">
      <Row>
        <Col xs={ 12 } sm={ 10 } smOffset={ 1 } md={ 8 } mdOffset={ 2 } lg={ 6 } lgOffset={ 3 }>
          <Jumbotron>
            { isOwner ? <Link to={`/meetups/${meetup._id}/edit`}>Edit</Link> : '' }
            <h3>{ meetup.name }</h3>
            <h4>
              <i className="fa fa-map-marker" />
              <a href={`http://maps.google.com/?q=${location}`} target="_blank">{ location }</a>
            </h4>
            { isMember ? <Button
              onClick={() => { toggleMembership(meetup._id); }}
              bsStyle="success"
            >
              <i className="fa fa-check"></i> You're a Member!
            </Button> : <Button
              bsStyle="warning"
              onClick={() => { toggleMembership(meetup._id); }}
            >Join this Meetup</Button> }
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
  isOwner: React.PropTypes.bool,
  isMember: React.PropTypes.bool,
};

export default ViewMeetup;
