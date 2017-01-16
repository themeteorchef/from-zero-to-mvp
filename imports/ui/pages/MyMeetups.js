import React from 'react';
import { Link } from 'react-router';
import { Jumbotron, Alert } from 'react-bootstrap';
import MeetupsList from '../components/MeetupsList.js';

const MyMeetups = ({ cta, meetups }) => (
  <div className="MyMeetups">
    <Jumbotron>
      <h3>Your meetups.</h3>
      <p>All of the movements you lead.</p>
      <Link className="btn btn-success" to={ cta.href }>{ cta.label }</Link>
    </Jumbotron>

    { meetups.length > 0 ?
      <MeetupsList meetups={ meetups } /> :
      <Alert>You haven't started any meetups yet.</Alert> }
  </div>
);

MyMeetups.propTypes = {
  cta: React.PropTypes.object,
  meetups: React.PropTypes.array,
};

export default MyMeetups;
