import React from 'react';
import moment from 'moment';
import { Link, browserHistory } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class CreateEditEvent extends React.Component {
  constructor(props) {
    super(props);
    const startDateTime = props.event ? props.event.startDateTime : undefined;
    const endDateTime = props.event ? props.event.endDateTime : undefined;
    const initialStartDateTime = moment(startDateTime).format('MMMM Do, YYYY [at] hh:mm a');
    const initialEndDateTime = moment(endDateTime).add(1, 'hour').format('MMMM Do, YYYY [at] hh:mm a');
    this.state = { startDateTime: initialStartDateTime, endDateTime: initialEndDateTime };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { event } = this.props;

    const eventToUpsert = {
      published: this.published.value,
      meetup: this.meetup.value,
      name: this.name.value,
      description: this.description.value,
      startDateTime: this.state.startDateTime,
      endDateTime: this.state.endDateTime,
      location: {
        name: this.location.value,
        address: this.address.value,
        city: this.city.value,
        state: this.eventState.value,
      },
    };

    if (event) eventToUpsert._id = event._id;

    console.log(eventToUpsert);
    // Meteor.call('events.upsert', eventToUpsert, (error, eventId) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     browserHistory.push(`/events/${eventId}`);
    //     Bert.alert('Event created!', 'success');
    //   }
    // });
  }

  render() {
    const { meetups, event } = this.props;
    return (
      <div className="CreateEditEvent">
        { meetups.length > 0 ? <Row>
          <Col xs={ 12 } sm={ 10 } smOffset={ 1 } md={ 8 } mdOffset={ 2 } lg={ 6 } lgOffset={ 3 }>
            <Row>
              <Col xs={ 12 }>
                <FormGroup>
                  <ControlLabel>Published</ControlLabel>
                  <select
                    ref={published => (this.published = published)}
                    className="form-control"
                    placeholder="Published?"
                    defaultValue={ event && event.published }
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <p className="form-hint">If yes, event will be displayed to the public upon creation.</p>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <FormGroup>
                  <ControlLabel>Meetup</ControlLabel>
                  <select
                    ref={meetup => (this.meetup = meetup)}
                    className="form-control"
                    placeholder="Select a meetup..."
                    defaultValue={ event && event.meetup }
                  >
                    {meetups.map(({ _id, name }) => (
                      <option key={ _id } value={ _id }>{ name }</option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <FormGroup>
                  <ControlLabel>Event Name</ControlLabel>
                  <input
                    type="text"
                    className="form-control"
                    ref={name => (this.name = name)}
                    placeholder="Monthly Talks &amp; Presentations"
                    defaultValue={ event && event.name }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <FormGroup>
                  <ControlLabel>Event Description</ControlLabel>
                  <textarea
                    className="form-control"
                    ref={description => (this.description = description)}
                    placeholder="For this meetup, we'll be discussing..."
                    defaultValue={ event && event.description }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 } sm={ 6 }>
                <FormGroup>
                  <ControlLabel>Event Starts</ControlLabel>
                  <Datetime
                    ref={startDateTime => (this.startDateTime = startDateTime)}
                    defaultValue={ this.state.startDateTime }
                    onChange={(startDateTime) => { this.setState({ startDateTime }); }}
                    dateFormat="MMMM Do, YYYY [at]"
                  />
                </FormGroup>
              </Col>
              <Col xs={ 12 } sm={ 6 }>
                <FormGroup>
                  <ControlLabel>Event Ends</ControlLabel>
                  <Datetime
                    ref={endDateTime => (this.endDateTime = endDateTime)}
                    defaultValue={ this.state.endDateTime }
                    onChange={(endDateTime) => { this.setState({ endDateTime }); }}
                    dateFormat="MMMM Do, YYYY [at]"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <FormGroup>
                  <ControlLabel>Location Name</ControlLabel>
                  <input
                    type="text"
                    className="form-control"
                    ref={location => (this.location = location)}
                    placeholder="Paula's Pizza Palace"
                    defaultValue={ event && event.name }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 } sm={ 6 }>
                <FormGroup>
                  <ControlLabel>Street Address</ControlLabel>
                  <input
                    type="text"
                    className="form-control"
                    ref={address => (this.address = address)}
                    placeholder="1658 N. Milwaukee"
                    defaultValue={ event && event.location && event.location.address }
                  />
                </FormGroup>
              </Col>
              <Col xs={ 12 } sm={ 3 }>
                <FormGroup>
                  <ControlLabel>City</ControlLabel>
                  <input
                    type="text"
                    className="form-control"
                    ref={city => (this.city = city)}
                    placeholder="Chicago"
                    defaultValue={ event && event.location && event.location.city }
                  />
                </FormGroup>
              </Col>
              <Col xs={ 12 } sm={ 3 }>
                <FormGroup>
                  <ControlLabel>State</ControlLabel>
                  <input
                    type="text"
                    className="form-control"
                    ref={eventState => (this.eventState = eventState)}
                    placeholder="IL"
                    defaultValue={ event && event.location && event.location.state }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                <Button
                  type="button"
                  bsStyle="success"
                  onClick={ this.handleSubmit }
                >Create Event</Button>
              </Col>
            </Row>
          </Col>
        </Row> : <Alert>
          You don't have any meetups yet. <Link to="/meetups/create">Create one</Link>
        </Alert> }
      </div>
    );
  }
}

CreateEditEvent.propTypes = {
  meetups: React.PropTypes.array,
  event: React.PropTypes.object,
};
