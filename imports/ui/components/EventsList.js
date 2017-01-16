import React from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';
import moment from 'moment';
import buildAddress from '../../modules/build-address.js';

const EventsList = ({ events }) => (
  <div className="EventsList">
    {events.map(({ _id, name, date, location, description }) => (
      <Panel key={ _id } className="EventsListItem">
        <h4><Link to={`/events/${_id}`}>{ name }</Link></h4>
        <p>{ moment(date).format('MMMM Do, YYYY [at] hh:mm a') } | { buildAddress(location) }</p>
        <p>{ description }</p>
      </Panel>
    ))}
  </div>
);

EventsList.propTypes = {
  events: React.PropTypes.array,
};

export default EventsList;
