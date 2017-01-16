import React from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';

const MeetupsList = ({ meetups }) => (
  <div className="MeetupsList">
    {meetups.map(({ _id, name, city, state, description }) => (
      <Panel key={ _id } className="MeetupsListItem">
        <h4><Link to={`/meetups/${_id}`}>{ name }</Link></h4>
        <p>{ description }</p>
        <p>{`${city} ${state}`}</p>
      </Panel>
    ))}
  </div>
);

MeetupsList.propTypes = {
  meetups: React.PropTypes.array,
};

export default MeetupsList;
