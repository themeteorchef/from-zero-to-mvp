import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import MeetupsList from '../components/MeetupsList.js';

const MeetupsIndex = ({ cta, newMeetups, popularMeetups, allMeetups }) => (
  <div className="MeetupsIndex">
    <Jumbotron>
      <h3>Join a movement.</h3>
      <p>{ allMeetups.length } meetups on Gather. Find one that inspires you.</p>
      <Link className="btn btn-success" to={ cta.href }>{ cta.label }</Link>
    </Jumbotron>

    <h4 className="page-header">New Meetups</h4>
    <MeetupsList meetups={ newMeetups } />

    <h4 className="page-header">Popular Meetups</h4>
    <MeetupsList meetups={ popularMeetups } />

    <h4 className="page-header">All Meetups</h4>
    <MeetupsList meetups={ allMeetups } />
  </div>
);

MeetupsIndex.propTypes = {
  cta: React.PropTypes.object,
  newMeetups: React.PropTypes.array,
  popularMeetups: React.PropTypes.array,
  allMeetups: React.PropTypes.array,
};

export default MeetupsIndex;
